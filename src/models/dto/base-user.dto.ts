export interface BaseUserDTO {
    id: number | null;
    identity: string;
    phoneNumber: string;
    email: string;
    role: string;
}