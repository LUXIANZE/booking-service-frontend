import React, { useEffect, useState } from "react";
import { getDeviceId } from "../../utils/device";
import { BaseUserDTO } from "../../models/dto/base-user.dto";
import { PublicUserList } from "./components/PublicUserList";
import { getUsersByDeviceId } from "../../http/user-api";

export const PublicUserPage: React.FC = () => {
    const deviceId = getDeviceId();
    const [publicUsers, setPublicUsers] = useState<BaseUserDTO[]>([]);

    useEffect(() => {
        try {
            (async () => {
                const res = await getUsersByDeviceId(deviceId);

                if (res && res.status === 200) {
                    setPublicUsers(res.data);
                }
            })();
        } catch (e) {
            console.error(e);
        }
    }, [deviceId]);

    return <>
        <div className="flex h-screen">
            <div className="m-auto">
                <PublicUserList publicUsers={publicUsers} />
            </div>
        </div>
    </>;
};