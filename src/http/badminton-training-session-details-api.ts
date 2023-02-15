import {PageableDTO} from "../models/dto/pageable.dto";
import {AxiosInstance} from "./axios-config";
import {PageModel} from "../models/dto/page-model";
import {getPageableString} from "../utils/pageable";
import {BadmintonTrainingSessionDetailsDTO} from "../models/dto/badminton-training-session-details.dto";

export const getBadmintonTrainingSessionDetails = (pageable: PageableDTO) => {
    const pageableString = getPageableString(pageable);
    return AxiosInstance.get<PageModel<BadmintonTrainingSessionDetailsDTO>>(`badminton-training-session-details?${pageableString}`);
};

export const updateBadmintonTrainingSessionDetails = (badmintonTrainingSessionDetailsDTO: BadmintonTrainingSessionDetailsDTO) => {
    return AxiosInstance.put<BadmintonTrainingSessionDetailsDTO>(`badminton-training-session-details`, badmintonTrainingSessionDetailsDTO);
};

export const createBadmintonTrainingSessionDetails = (badmintonTrainingSessionDetailsDTO: BadmintonTrainingSessionDetailsDTO) => {
    return AxiosInstance.post<BadmintonTrainingSessionDetailsDTO>(`badminton-training-session-details`, badmintonTrainingSessionDetailsDTO);
};

export const getBadmintonTrainingSessionDetailsById = (id: number) => {
    return AxiosInstance.get<BadmintonTrainingSessionDetailsDTO>(`badminton-training-session-details/${id}`);
};

export const getBadmintonTrainingSessionDetailsBySessionId = (sessionId: number) => {
    return AxiosInstance.get<BadmintonTrainingSessionDetailsDTO>(`badminton-training-session-details/sessionId/${sessionId}`);
};