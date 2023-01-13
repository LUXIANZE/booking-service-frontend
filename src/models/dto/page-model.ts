export interface PageModel<T> {
    totalElements: number,
    totalPages: number,
    size: number,
    content: T[],
    number: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    first: boolean,
    last: boolean,
    numberOfElements: number,
    pageable: {
        offset: number,
        sort: {
            empty: boolean,
            unsorted: boolean,
            sorted: boolean
        },
        pageSize: number,
        pageNumber: number,
        unpaged: boolean,
        paged: boolean
    },
    empty: boolean
}