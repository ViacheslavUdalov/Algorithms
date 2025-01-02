import {UserModel} from "../serverModels/user.js";
import {RegisterData} from "../serverModels/registerData.js";
import {ReturnDataRegister, UserTypeFromDB} from "../serverModels/returnDataRegister.js";
import {LoginData} from "../serverModels/loginData.js";

export interface AuthDbInterface {
    config: any
    user: UserModel
    register(data: RegisterData): Promise<ReturnDataRegister>,
    getUser(token: string): Promise<UserTypeFromDB | boolean>,
    login(data: LoginData): Promise<ReturnDataRegister | boolean>,
    checkRoleIsAdmin(token: string): boolean
}