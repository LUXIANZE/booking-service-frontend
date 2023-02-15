import React from "react";
import { Button, Stack } from "@mui/material";
import { checkAgainstServerUUID, localUuidExists, registerLocalUUID, registerServerUUID } from "../../utils/device";
import { useNavigate } from "react-router-dom";

export const WelcomePage: React.FC = () => {

    const navigate = useNavigate();

    const applicationStartCheck = async () => {
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

    };

    return <>
        <div className="flex h-screen">
            <div className="m-auto">
                <Stack spacing={2}>
                    <Button style={{ width: '100%' }} variant="contained" onClick={applicationStartCheck}>
                        Book Badminton Training
                    </Button>
                    <Button style={{ width: '100%' }} variant="contained" onClick={() => { }}>
                        View My Bookings
                    </Button>
                </Stack>
            </div>
        </div>
    </>;
};