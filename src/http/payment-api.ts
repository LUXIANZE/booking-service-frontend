import {AxiosInstance} from "./axios-config";

export const payment = async () => {
    return AxiosInstance.post<string>("/payment");
};