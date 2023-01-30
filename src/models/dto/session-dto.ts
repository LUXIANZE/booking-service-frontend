export interface SessionDTO {
    id: number;
    dateTime: string;
    totalSlots: number;
    sessionType: SessionType;
}

export enum SessionType {
    BADMINTON_TRAINING = "BADMINTON_TRAINING"
}