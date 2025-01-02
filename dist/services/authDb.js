var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import User from "../serverModels/schema/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthDb {
    constructor(config) {
        this.config = config;
    }
    async register(data) {
        const saltPassword = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, saltPassword);
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
        }, this.config.secretKey, {
            expiresIn: this.config.tokenExpired
        });
        const userReturn = user.toObject();
        const { password } = userReturn, userData = __rest(userReturn, ["password"]);
        return {
            userData: userData,
            token
        };
    }
    async getUser(token) {
        if (!token) {
            return false;
        }
        const decoded = jwt.verify(token, this.config.secretKey);
        const user = await User.findById(decoded._id).lean();
        if (user) {
            const { password } = user, userReturn = __rest(user, ["password"]);
            // @ts-ignore
            return userReturn;
        }
        else {
            return false;
        }
    }
    // @ts-ignore
    async login(data) {
        const user = await User.findOne({ email: data.email }).lean();
        if (!user) {
            return false;
        }
        const isValidPass = await bcrypt.compare(data.password, user.password);
        if (!isValidPass) {
            return false;
        }
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, this.config.secretKey, {
            expiresIn: this.config.tokenExpired
        });
        const { password } = user, userData = __rest(user, ["password"]);
        return {
            userData,
            token
        };
    }
    checkRoleIsAdmin(token) {
        const decoded = jwt.verify(token, this.config.secretKey);
        if (decoded.role !== 'admin') {
            return false;
        }
        else {
            return true;
        }
    }
}
