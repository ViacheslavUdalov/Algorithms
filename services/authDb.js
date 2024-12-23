import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

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
      })        ;
        const user = await doc.save();
        
        const token = jwt.sign({ 
            _id: user._id
        },
            'udalovich115', 
            {
                expiresIn: '30d'
            });
        const {passwordHash, ...userData} = user._doc;
        return {
            userData,
            token
        }
    }
    
    async login(data) {
        const user = await User.findOne({email: data.email});
        if (!user) {
            return 'не зареган чел'
        }
        
        const isValidPass = await bcript.compare(data.password, user._doc.password);
        if (!isValidPass) {
            return 'а пароль то не верный'
        }
        
        const token = jwt.sign({
            _id: user._id
        },
            'udalovich115',
            {
                expiresIn: '30d'
            });
        const {passwordHash, ...userData} = user._doc;
        return {
            userData, 
            token
        }
    }
}