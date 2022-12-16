import {AxiosInstance} from "./axios-config";
import {PublicUserDTO} from "../models/dto/public-user.dto";

export const createPublicUser = async (data: PublicUserDTO) => {
    return AxiosInstance.post<PublicUserDTO>('public-user', data);
}

export const updatePublicUser = async (data: PublicUserDTO) => {
    return AxiosInstance.post<PublicUserDTO>('public-user', data);
}

export const getPublicUser = async (id: number) => {
    return AxiosInstance.get<PublicUserDTO>('public-user/' + id);
}

export const getPublicUsersByDeviceId = async (deviceId: string) => {
    return AxiosInstance.get<PublicUserDTO[]>('public-user/get-by-device-id/' + deviceId);
}