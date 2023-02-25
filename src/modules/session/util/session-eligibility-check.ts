import { SessionDTO } from "../../../models/dto/session-dto";

export const isSessionAvailable = (session: SessionDTO, bookingCount: number, now: Date) => {
    if (bookingCount >= session.totalSlots) {
        return false;
    }

    if (new Date(session.dateTime) <= now) {
        return false;
    }

    return true;
}