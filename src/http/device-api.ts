import {AxiosInstance} from "./axios-config";
import {DeviceDTO} from "../models/dto/device.dto";

export const createDevice = async (data: DeviceDTO) => {
    return AxiosInstance.post<DeviceDTO>('device', data);
};

export const getDeviceById = async (id: string) => {
    return AxiosInstance.get<DeviceDTO>('device/' + id);
};