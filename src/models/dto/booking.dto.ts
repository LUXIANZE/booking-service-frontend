export interface BookingDTO {
    id: number | null;
    userId: number;
    sessionId: number;
    paymentDone: boolean;
    attendance: boolean;
}