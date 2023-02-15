export const getLocalDate: (date: Date) => string = (date) => date.toISOString().split("T")[0];
