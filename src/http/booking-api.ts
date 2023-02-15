import {AxiosInstance} from "./axios-config";
import {BookingDTO} from "../models/dto/booking.dto";
import {PageModel} from "../models/dto/page-model";
import {PageableDTO} from "../models/dto/pageable.dto";
import {getPageableString} from "../utils/pageable";

export const getBookingsBySessionId = (pageable: PageableDTO, sessionId: number) => {
    const pageableString = getPageableString(pageable);
    return AxiosInstance.get<PageModel<BookingDTO>>(`booking?${pageableString}&sessionId=${sessionId}`);
};

export const getBookingById = (id: number) => {
    return AxiosInstance.get<BookingDTO>(`booking/${id}`);
};

export const createBooking = (bookingDTO: BookingDTO) => {
    return AxiosInstance.post<BookingDTO>("booking", bookingDTO);
};

export const updateBooking = (bookingDTO: BookingDTO) => {
    return AxiosInstance.put<BookingDTO>("booking", bookingDTO);
};
