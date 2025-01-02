import {describe} from "node:test";
import {AuthDb} from "./authDb.js";
import config from "../../config.js";
import {TokenExpiredError} from "jsonwebtoken";
import {log} from "util";

const authDb = new AuthDb(config);

const registerData = {
    email: "test@example.com",
    username: "testuser",
    password: "password123",
    confirmPassword: "password123",
    role: "user"
}

describe('Authentication tests', () => {
    describe('register', () => {
        test('should return user with token', async () => {
            const result = await authDb.register(registerData);
            console.log(result);
            expect(result).toHaveProperty('token');

        })
     })
})