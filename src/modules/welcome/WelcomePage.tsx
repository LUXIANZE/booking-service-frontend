import React, {useState} from "react";
import {Button} from "@mui/material";
import {checkAgainstServerUUID, localUuidExists, registerLocalUUID, registerServerUUID} from "../../utils/device";
import {DEVICE_UUID_KEY} from "../../constants/local-storage-constants";
import {useNavigate} from "react-router-dom";

export const WelcomePage: React.FC = () => {

    const [, setDeviceId] = useState<string>();
    const navigate = useNavigate();

    const applicationStartCheck = async () => {
        if (localUuidExists()) {
            const valid = await checkAgainstServerUUID();
            if (valid) {
                const uuid = localStorage.getItem(DEVICE_UUID_KEY);
                if (uuid) {
                    setDeviceId(uuid);
                }
            }
        } else {
            registerLocalUUID();
            await registerServerUUID();
        }

        navigate("/public-users")

    };

    return <>
        <div className="flex h-screen">
            <div className="m-auto">
                <Button style={{width: '100%'}} variant="contained" onClick={applicationStartCheck}>Book
                    for haircut</Button>
            </div>
        </div>
    </>;
};