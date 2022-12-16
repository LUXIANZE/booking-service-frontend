import {v4 as uuidV4} from 'uuid';
import {DEVICE_UUID_KEY} from "../constants/local-storage-constants";
import {createDevice, getDeviceByDeviceId} from "../http/device-api";

export const registerLocalUUID = () => {
    const uuid = uuidV4();
    localStorage.setItem(DEVICE_UUID_KEY, uuid);
};

export const registerServerUUID = async () => {
    const localUUID = localStorage.getItem(DEVICE_UUID_KEY);
    if (localUUID) {
        try {
            await createDevice({deviceId: localUUID});
        } catch (e) {
            console.error(e);
        }
    }
};

export const localUuidExists = () => {
    return !!localStorage.getItem(DEVICE_UUID_KEY);
};

export const checkAgainstServerUUID = async () => {
    const localUUID = localStorage.getItem(DEVICE_UUID_KEY);
    if (!localUUID) {
        return false;
    }

    try {
        const serverUUID = await getDeviceByDeviceId(localUUID);

        if (serverUUID && serverUUID.status === 200) {
            return serverUUID.data.deviceId === localUUID;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }

};

export const getDeviceId = () => localStorage.getItem(DEVICE_UUID_KEY) || '';