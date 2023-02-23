import React from "react";
import { Button, Stack, Zoom } from "@mui/material";
import { checkAgainstServerUUID, localUuidExists, registerLocalUUID, registerServerUUID } from "../../utils/device";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const WelcomePage: React.FC = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const applicationStartCheck = async () => {
        try {
            if (localUuidExists()) {
                const valid = await checkAgainstServerUUID();
                if (!valid) {
                    registerLocalUUID();
                    await registerServerUUID();
                }
            } else {
                registerLocalUUID();
                await registerServerUUID();
            }

            navigate("/sessions");
        } catch (e) {
            console.error('Error >>: ', e)

            const error = e as any;
            if (error && error.response && error.response.status === 404) {
                registerLocalUUID();
                await registerServerUUID();
                navigate("/sessions");
            } else {
                enqueueSnackbar('Unable to connect to server. Please check your internet connection or contact xxx-xxxxxxx', { variant: 'error' })
            }

        }


    };

    return <>
        <div className="flex h-screen">
            <div className="m-auto">
                <Stack spacing={2}>
                    <Zoom in timeout={400}>
                        <Button style={{ width: '100%' }} size='large' variant="contained" onClick={applicationStartCheck}>
                            Book Badminton Training
                        </Button>
                    </Zoom>
                    <Zoom in timeout={800}>
                        <Button style={{ width: '100%' }} variant="contained" onClick={() => { }}>
                            View My Bookings
                        </Button>
                    </Zoom>
                </Stack>
            </div>
        </div>
    </>;
};