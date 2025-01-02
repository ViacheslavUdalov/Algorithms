import {Types} from "mongoose";

export type ReturnDataRegister = {
   userData: UserTypeFromDB,
    token: string
}
export type UserTypeFromDB = {
    username: string,
    email:string,
    _id: Types.ObjectId,
    role: string
}