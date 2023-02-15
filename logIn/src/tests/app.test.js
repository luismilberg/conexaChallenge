const authService = require('../components/auth/auth.service');
const userService = require('../components/users/user.service');
const request = require("supertest");
const { app, server } = require('../index');
const db = require('./db');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => {
    await db.closeDatabase();
    await server.close();
});



describe('Auth endpoint test', () => {

    test('Should return a token when login', async () => {
        const userBody = {
            email: 'luismilberg@gmail.com',
            password: '123456'
        }
        await userService.createUser(userBody);
        // const response = await authService.autenticarUsuario(userBody);
        const res = await request(app).post('/login').send(userBody);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('Should reject when no password sended', async () => {
        const userBody = {
            email: 'luismilberg@gmail.com',
            password: '123456'
        }
        await userService.createUser(userBody);
        const requestBody = {
            email: userBody.email,
        }
        await expect(authService.autenticarUsuario(requestBody)).rejects.toThrow();
    });

    test('Should reject when no email sended', async () => {
        const userBody = {
            email: 'luismilberg@gmail.com',
            password: '123456'
        }
        await userService.createUser(userBody);
        const requestBody = {
            password: userBody.password,
        }
        await expect(authService.autenticarUsuario(requestBody)).rejects.toThrow();
    });

    test("Should reject when user doesn't exists", async () => {
        const userBody = {
            email: 'luismilberg@gmail.com',
            password: '123456'
        }
        await expect(authService.autenticarUsuario(userBody)).rejects.toThrow();
    });

});

describe('Users endpoint test', () => {

    test('Should create a new user', async () => {
        const userBody = {
            email: 'luismilberg@gmail.com',
            password: '123456'
        }

        const res = await request(app).post("/users").send(userBody);
        const user = res.body;
        const userDb = await userService.getUserByEmail(userBody.email);
        expect(res.statusCode).toBe(201);
        expect(user.email).toEqual(userDb.email);
    });

    test('Should reject when no email sended', async () => {
        const userBody = {
            password: '123456'
        }
        const res = await request(app).post("/users").send(userBody);
        expect(res.statusCode).toBe(400);
    });

    test('Should reject when no password sended', async () => {
        const userBody = {
            email: 'luismilberg@gmail.com',
        }
        const res = await request(app).post("/users").send(userBody);
        expect(res.statusCode).toBe(400);
    });


});