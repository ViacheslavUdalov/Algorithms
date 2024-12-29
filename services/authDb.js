import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcript from "bcrypt";
import config from "../config.js";

export class AuthDb {
    user;

    constructor(config) {

    }

    async register(data) {
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
            config.secretKey,
            {
                expiresIn: config.tokenExpired
            });
        const {password, ...userData} = user._doc;
        return {
            userData,
            token
        }
    }

    async getUser(token) {
        if (!token) {
            return
        }
        const decoded = jwt.verify(token, config.secretKey);
        const user = await User.findById(decoded._id);
        const {password, ...userReturn} = user._doc;
        if (user) {
            return userReturn
        } else {
            return 'NOOOOO User!!!!!'
        }
    }

    async login(data) {
        const user = await User.findOne({email: data.email});
        if (!user) {
            return false
        }

        const isValidPass = await bcript.compare(data.password, user._doc.password);
        if (!isValidPass) {
            return false
        }

        const token = jwt.sign({
                _id: user._id,
                role: user.role
            },
            config.secretKey,
            {
               expiresIn: config.tokenExpired
            });
        const {password, ...userData} = user._doc;
        return {
            userData,
            token
        }
    }

    checkRoleIsAdmin(token) {
        const decoded = jwt.verify(token, config.secretKey);
        if (decoded.role !== 'admin') {
            return false
        } else {
            return true
        }
    }
}

