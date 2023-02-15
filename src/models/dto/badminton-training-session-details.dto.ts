export interface BadmintonTrainingSessionDetailsDTO {
    id: number;
    sessionId: number;
    durationInHours: number;
    price: number;
    currency: string;
    coachId: number;
}