import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcript from "bcrypt";

export class AuthDb {
    constructor(config) {

    }

    user;

    async register(data) {
        console.log(data)
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
            'udalovich115',
            {
                expiresIn: '2m'
            });
        const {password, ...userData} = user._doc;
        return {
            userData,
            token
        }
    }

    async getUser(token) {
        console.log(token);
        if(!token) {
            return 
        }
        const decoded = jwt.verify(token, 'udalovich115');
        const user = await User.findById(decoded._id);
        const {password, ...userReturn} = user._doc;
        console.log(`userReturn`, userReturn)
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
            return 'а пароль то не верный'
        }

        const token = jwt.sign({
                _id: user._id,
                role: user.role
            },
            'udalovich115',
            {
                expiresIn: '2m'
            });
        const {password, ...userData} = user._doc;
        return {
            userData,
            token
        }
    }

    checkRoleIsAdmin(token) {
        console.log(`token`, token)
        const decoded = jwt.verify(token, 'udalovich115');
        if (decoded.role !== 'admin') {
            return false
        } else {
            return true
        }
    }
}

