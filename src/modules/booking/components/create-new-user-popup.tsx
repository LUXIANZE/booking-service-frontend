import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createDeviceUser } from "../../../http/device-user-api";
import { createUser } from "../../../http/user-api";
import { BaseUserDTO } from "../../../models/dto/base-user.dto";
import { getDeviceId } from "../../../utils/device";
import { useSnackbar } from 'notistack'

export interface CreateNewUserPopupProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setUser: (user: BaseUserDTO) => void;
}

export const CreateNewUserPopup: React.FC<CreateNewUserPopupProps> = ({ open, setOpen, setUser }) => {
    const [email, setEmail] = useState<string>('');
    const [identity, setIdentity] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        return () => {
            setEmail('');
            setIdentity('');
            setPhoneNumber('');
        }
    }, [])

    const cancelUserCreation = () => {
        setOpen(false);
    };

    const userCreation = async () => {
        if (email && identity && phoneNumber) {

            const createUserRes = await createUser({
                id: null,
                email: email,
                identity: identity,
                phoneNumber: phoneNumber,
                pin: null,
                role: "PUBLIC"
            });

            if (createUserRes && createUserRes.status === 200 && (typeof createUserRes.data.id === 'number')) {
                const deviceId = getDeviceId();
                const createDeviceUserRes = await createDeviceUser({
                    id: null,
                    deviceId: deviceId,
                    userId: createUserRes.data.id,
                });

                if (createDeviceUserRes && createDeviceUserRes.status === 200) {
                    setUser(createUserRes.data);
                } else {
                    enqueueSnackbar('Failed to create device user', { variant: 'error' })
                }
                setOpen(false);
            }
        }
    };

    return <>
        <Dialog open={open} onClose={cancelUserCreation}>
            <DialogTitle>Create new user</DialogTitle>
            <DialogContent>
                <Stack style={{ margin: 10 }} spacing={5}>
                    <TextField label="I/C" value={identity} onChange={(value) => setIdentity(value.target.value)} />
                    <TextField label="Email" value={email} onChange={(value) => setEmail(value.target.value)} />
                    <TextField label="Mobile Number" value={phoneNumber} onChange={(value) => setPhoneNumber(value.target.value)} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelUserCreation}>Cancel</Button>
                <Button onClick={userCreation}>Confirm</Button>
            </DialogActions>
        </Dialog>
    </>;
};
