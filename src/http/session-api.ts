import {AxiosInstance} from "./axios-config";
import {SortModel} from "../models/dto/sort-model";
import {PageModel} from "../models/dto/page-model";
import {SessionDTO} from "../models/dto/session-dto";

export const getSessions = (page: number, size: number, sort?: SortModel[]) => {
    let sortString = "";

    if (sort) {
        sort.forEach(s => {
            const formattedSortString = `${s.fieldName},${s.sort}`;
            sortString += `&sort=${formattedSortString}`;
        });
    }

    return AxiosInstance.get<PageModel<SessionDTO>>(`session?page=${page}&size=${size}${sortString}`);
};