import {AxiosInstance} from "./axios-config";
import {UserDTO} from "../models/dto/user.dto";
import {BaseUserDTO} from "../models/dto/base-user.dto";

export const getUsers = () => {
    return AxiosInstance.get<BaseUserDTO[]>(`user`);
};

export const getUserByIdentity = (identity: string) => {
    return AxiosInstance.get<BaseUserDTO>(`user/${identity}`);
};

export const getUsersByDeviceId = (deviceId: string) => {
    return AxiosInstance.get<BaseUserDTO[]>(`user/deviceId/${deviceId}`);
};

export const createUser = (userDTO: UserDTO) => {
    return AxiosInstance.post<BaseUserDTO>(`user`, userDTO);
};
