import {AxiosInstance} from "./axios-config";
import {BookingDTO} from "../models/dto/booking.dto";
import {PageModel} from "../models/dto/page-model";

export const createBooking = () => {
    return AxiosInstance.post("");
};

export const getBookingBySessionId = (sessionId: number) => {
    return AxiosInstance.get<PageModel<BookingDTO>>("/booking?sessionId=" + sessionId);
};