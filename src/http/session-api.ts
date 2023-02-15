import {AxiosInstance} from "./axios-config";
import {PageModel} from "../models/dto/page-model";
import {SessionDTO} from "../models/dto/session-dto";
import {PageableDTO} from "../models/dto/pageable.dto";
import {getPageableString} from "../utils/pageable";
import {getLocalDate} from "../utils/local-date";

export const getSessions = (pageable: PageableDTO, date: Date) => {
    const pageableString = getPageableString(pageable);
    const filterDate = getLocalDate(date);

    return AxiosInstance.get<PageModel<SessionDTO>>(`session?${pageableString}&dateString=${filterDate}`);
};

export const updateSession = (sessionDTO: SessionDTO) => {
    return AxiosInstance.put<SessionDTO>("session", sessionDTO);
};

export const createSession = (sessionDTO: SessionDTO) => {
    return AxiosInstance.post<SessionDTO>("session", sessionDTO);
};

export const getSessionById = (id: number) => {
    return AxiosInstance.get<SessionDTO>(`session/${id}`)
}