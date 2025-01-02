


import {AuthDb} from "../backend/services/authDb";
import config from "../config";
import restoreAllMocks = jest.restoreAllMocks;

const authDb = new AuthDb(config);

const registerData = {
    email: "test@example.com",
    username: "testuser",
    password: "password123",
    confirmPassword: "password123",
    role: "user"
}
beforeEach(() => {
    restoreAllMocks();
});


describe('Authentication tests', () => {
    describe('register', () => {
        test('should return user with token', async () => {

            // const functionNameMock = jest.fn();
            // jest.spyOn(authDb, "register");
            //
            
            const result = await authDb.register(registerData);
            console.log(result);
            expect(result).toHaveProperty('token');
            
        })
     })
})