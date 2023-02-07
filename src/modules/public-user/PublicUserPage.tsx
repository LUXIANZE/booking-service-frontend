import React, {useEffect, useState} from "react";
import {getDeviceId} from "../../utils/device";
import {PublicUserDTO} from "../../models/dto/public-user.dto";
import {PublicUserList} from "./components/PublicUserList";

export const PublicUserPage: React.FC = () => {
    const deviceId = getDeviceId();
    const [publicUsers, setPublicUsers] = useState<PublicUserDTO[]>([]);

    useEffect(() => {
        try {
            // TODO: This API is migrated to user API
            // (async () => {
            //     const res = await getPublicUsersByDeviceId(deviceId);
            //
            //     if (res && res.status === 200) {
            //         setPublicUsers(res.data);
            //     }
            // })();
        } catch (e) {
            console.error(e);
        }
    }, [deviceId]);

    return <>
        <div className="flex h-screen">
            <div className="m-auto">
                <PublicUserList publicUsers={publicUsers}/>
            </div>
        </div>
    </>;
};