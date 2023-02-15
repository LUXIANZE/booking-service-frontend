import {AxiosInstance} from "./axios-config";

export const payment = async (bookingId: number) => {
    return AxiosInstance.post<string>("/payment", `${bookingId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};