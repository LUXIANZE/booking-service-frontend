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
            enqueueSnackbar('Unable to connect to server. Please check your internet connection or contact xxx-xxxxxxx', { variant: 'error' })
        }


    };

    const actionButtonList = [
        <Button style={{ width: '100%' }} size='large' variant="contained" onClick={applicationStartCheck}>
            Book Badminton Training
        </Button>,
        <Button style={{ width: '100%' }} variant="contained" onClick={() => { }}>
            View My Bookings
        </Button>
    ]

    return <>
        <div className="flex h-screen">
            <div className="m-auto">
                <Stack spacing={2}>
                    {actionButtonList.map((component, index) => <>
                        <Zoom key={index} in timeout={(index + 1) * 400} >
                            {component}
                        </Zoom>
                    </>)}
                </Stack>
            </div>
        </div>
    </>;
};