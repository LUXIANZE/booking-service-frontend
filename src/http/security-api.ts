import {AxiosInstance} from "./axios-config";
import {PublicUserDTO} from "../models/dto/public-user.dto";
import {UserDTO} from "../models/dto/user.dto";
import {LoginDTO} from "../models/dto/login.dto";

export const ping = async () => {
    return AxiosInstance.get<string>(`security`)
}

export const register = async (userDTO: UserDTO) => {
    return AxiosInstance.post<PublicUserDTO>(`security`, userDTO)
}
export const login = async (loginDTO: LoginDTO) => {
    return AxiosInstance.post<string>(`security`, loginDTO)
}