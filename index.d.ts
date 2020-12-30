// import {IUser, User} from "./models/users";

declare namespace Express {
    export interface Request {
        user?: User
        tenant?: string
    }
}