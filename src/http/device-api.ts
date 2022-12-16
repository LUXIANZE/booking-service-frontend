import {AxiosInstance} from "./axios-config";
import {DeviceDTO} from "../models/dto/device.dto";

export const createDevice = async (data: DeviceDTO) => {
    return AxiosInstance.post<DeviceDTO>('device', data);
};

export const getDeviceByDeviceId = async (deviceId: string) => {
    return AxiosInstance.get<DeviceDTO>('device/' + deviceId);
};