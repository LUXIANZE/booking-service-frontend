import {SortModel} from "./sort-model";

export interface PageableDTO {
    page: number;
    size: number;
    sort: SortModel[];

}