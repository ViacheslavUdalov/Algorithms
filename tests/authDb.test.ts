
import assert from "node:assert";
import { describe, mock, test } from 'node:test';
import jwt from "jsonwebtoken";
import {AuthDb} from "../backend/services/authDb.js";
import config from "../config.js";


const authDb = new AuthDb(config);
  
jwt.sign = () => 'testToken'

const registerData = {
    email: "komaru@komaru.ru",
    username: "udalick",
    password: "123",
    confirmPassword: "123",
    role: "user"
}
const returnData = {
    userData: {
        email: "komaru@komaru.ru",
        username: "udalick",
        role: "user",
    },
    token: "testToken"
}


describe('Authentication tests', () => {
    describe('register', () => {
        test('should return user with token', async () => {
            const register = mock.method(authDb, "register", async () => returnData);
            const result = await authDb.register(registerData);
            assert.strictEqual(result.token, returnData.token);
            assert.strictEqual(register.mock.calls.length, 1);
            assert.deepStrictEqual(register.mock.calls[0].arguments[0], registerData);
            assert.deepStrictEqual(returnData, result);
        })
     })
    describe('checkRoleIsAdmin', () => {
        test('should return false with user role', async () => {
            const register = mock.method(authDb, "checkRoleIsAdmin", async () => returnData);
            const result = await authDb.register(registerData);
            assert.strictEqual(result.token, returnData.token);
            assert.strictEqual(register.mock.calls.length, 1);
            assert.deepStrictEqual(register.mock.calls[0].arguments[0], registerData);
            assert.deepStrictEqual(returnData, result);
        })
    })
})