import {DeviceUserDTO} from "../models/dto/device-user.dto";
import {AxiosInstance} from "./axios-config";

export const createDeviceUser = (deviceUserDTO: DeviceUserDTO) => {
    return AxiosInstance.post<DeviceUserDTO>(`device-user`, deviceUserDTO);
};