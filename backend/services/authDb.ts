import {AuthDbInterface} from "../interfaces/AuthDbInterface.js";
import {UserModel} from "../serverModels/user.js";
import {RegisterData} from "../serverModels/registerData.js";
import {ReturnDataRegister, UserTypeFromDB} from "../serverModels/returnDataRegister.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../schema/userSchema.js";

export class AuthDb implements AuthDbInterface{
    user!: UserModel;
    config: any;

    constructor(config: any) {
        this.config = config;
    }

    async register(data: RegisterData):Promise<ReturnDataRegister> {
        const saltPassword = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, saltPassword)
        const doc = new User({
            email: data.email,
            username: data.username,
            password: hash,
            role: data.role
        });
        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
                role: user.role
            },
            this.config.secretKey,
            {
                expiresIn: this.config.tokenExpired
            });
        const userReturn = user.toObject();
        const {password, ...userData} = userReturn;
        return {
            userData: userData as UserTypeFromDB,
            token
        }
    }

    async getUser(token: string): Promise<UserTypeFromDB | boolean> {
        if (!token) {
            return false
        }
        const decoded = jwt.verify(token, this.config.secretKey) as jwt.JwtPayload;
        const user = await User.findById(decoded._id).lean();
        if (user) {
        const {password, ...userReturn} = user;
            // @ts-ignore
            return userReturn
        } else {
            return false
        }
    }

    // @ts-ignore
    async login(data: LoginData) {
        const user = await User.findOne({email: data.email}).lean();
        if (!user) {
            return false
        }

        const isValidPass = await bcrypt.compare(data.password, user.password as string);
        if (!isValidPass) {
            return false
        }

        const token = jwt.sign({
                _id: user._id,
                role: user.role
            },
            this.config.secretKey,
            {
                expiresIn: this.config.tokenExpired
            });
        const {password, ...userData} = user;
        return {
            userData,
            token
        }
    }

    checkRoleIsAdmin(token: string) {
        const decoded = jwt.verify(token, this.config.secretKey) as jwt.JwtPayload;
        if (decoded.role !== 'admin') {
            return false
        } else {
            return true
        }
        
    }
}

