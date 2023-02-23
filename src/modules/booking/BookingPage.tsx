import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BaseUserDTO } from "../../models/dto/base-user.dto";
import { Button, Stack, Typography, Zoom } from "@mui/material";
import { createBooking } from "../../http/booking-api";
import { payment } from "../../http/payment-api";
import { externalRedirect } from "../../utils/redirect";
import { useSnackbar } from "notistack";
import { UserList } from "./components/user-list";
import { CreateNewUserPopup } from "./components/create-new-user-popup";
import { LoadingButton } from "@mui/lab";

export const BookingPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const [sessionId, setSessionId] = useState<number>();
    const [user, setUser] = useState<BaseUserDTO>();
    const [createUserPopupOpen, setCreateUserPopupOpen] = useState<boolean>(false);
    const [redirectingToCheckout, setRedirectingToCheckout] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const sessionIdParam = Number(searchParams.get('sessionId'));
            console.log('sessionIdParam >>: ', sessionIdParam);
            setSessionId(sessionIdParam);
        })();
    }, [searchParams]);

    const createNewUser = () => {
        setCreateUserPopupOpen(true);
    };

    const bookSession = async () => {
        setRedirectingToCheckout(true);

        if (typeof user !== 'undefined') {
            if (sessionId && (typeof user.id === 'number')) {
                const res = await createBooking({
                    id: null,
                    sessionId: sessionId,
                    userId: user.id,
                    attendance: false,
                    paymentDone: false,
                });

                if (res && res.status === 200 && (typeof res.data.id === 'number')) {
                    const paymentLinkRes = await payment(res.data.id);
                    if (paymentLinkRes && paymentLinkRes.status === 200) {
                        externalRedirect(paymentLinkRes.data);
                    }
                }
            }
        } else {
            enqueueSnackbar(
                'No user Selected, please select existing user or create new user by clicking on New User button.',
                { variant: "error" }
            );
        }
    };


    return <>
        <Stack>
            <Typography variant="h6" style={{ margin: "30px auto" }} gutterBottom>Booking as</Typography>
            <Stack spacing={2} style={{ margin: "0px 20px" }}>
                <UserList selectedUser={user} onUserSelected={setUser} />
                <Zoom in timeout={400}>
                    <Button variant={'contained'} onClick={createNewUser}>New User</Button>
                </Zoom>
                <Zoom in timeout={600}>
                    <LoadingButton loading={redirectingToCheckout} variant={'contained'} onClick={bookSession}>Book this session</LoadingButton>
                </Zoom>
            </Stack>
        </Stack>
        <CreateNewUserPopup open={createUserPopupOpen} setOpen={setCreateUserPopupOpen} setUser={setUser} />
    </>;
};