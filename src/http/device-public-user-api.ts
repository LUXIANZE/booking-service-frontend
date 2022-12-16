import {AxiosInstance} from "./axios-config";
import {DevicePublicUserDTO} from "../models/dto/device-public-user.dto";

export const createDevicePublicUser = async (data: DevicePublicUserDTO) => {
    return AxiosInstance.post<DevicePublicUserDTO>('device-public-user', data);
}