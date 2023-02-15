import {BaseUserDTO} from "./base-user.dto";

export interface UserDTO extends BaseUserDTO {
    pin: string | null;
}