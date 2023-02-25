import { SortModel } from "../models/dto/sort-model";
import { PageableDTO } from "../models/dto/pageable.dto";

export const getSortString: (sortModel: SortModel[]) => string = (sortModel) => {
    let sortString = "";
    let sort = sortModel || [];

    if (sort) {
        sort.forEach(s => {
            const formattedSortString = `${s.fieldName},${s.sort}`;
            sortString += `&sort=${formattedSortString}`;
        });
    }

    return sortString;
};

export const getPageableString: (pageable: PageableDTO) => string = (pageable) => {
    const sortString = getSortString(pageable.sort).trim();

    return `page=${pageable.page}&size=${pageable.size}${sortString === "" ? "" : sortString}`;
};