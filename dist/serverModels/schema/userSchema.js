import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    username: String,
    role: String
});
const User = mongoose.model('User', UserSchema);
export default User;
