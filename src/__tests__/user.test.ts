import createServer from "../utils/server";
import supertest from "supertest";
import mongoose from "mongoose";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import { createUserSessionHandler } from "../controller/session.controller";

//TODO: deal with @ ts-ignore for lint

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

describe("user", () => {
  describe("user registration", () => {
    // describe("given the username and password are valid", () => {
    //   it("should return the user payload", async () => {
    //     const createUserServiceMock = jest
    //       .spyOn(UserService, "createUser")
    //       // @ts-ignore
    //       .mockReturnValueOnce(userPayload);

    //     const { statusCode, body } = await supertest(app)
    //       .post("/api/users")
    //       .send(userInput);

    //     expect(statusCode).toBe(200);

    //     expect(body).toEqual(userPayload);

    //     expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    //   });
    // });
    // describe("given the passwords do not match", () => {
    //   it("it should return a 400", async () => {
    //     const createUserServiceMock = jest
    //       .spyOn(UserService, "createUser")
    //       // @ts-ignore
    //       .mockReturnValueOnce(userPayload);

    //     const { statusCode } = await supertest(app)
    //       .post("/api/users")
    //       .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

    //     expect(statusCode).toBe(400);

    //     expect(createUserServiceMock).not.toHaveBeenCalled();
    //   });
    // });
    describe("given the user service throws", () => {
      it("should return a 409", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValue("oh no :(");

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);//Conflict error

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  //For a different way of doing things, this is mocking out all the services instead of calling the route with supertest
  describe("create user session", () => {
    // describe("given the username and password are valid", () => {
    //   it("should return a signed accessToken & refreshToken", async () => {
    //     jest
    //       .spyOn(UserService, "validatePassword")
    //       // @ts-ignore
    //       .mockReturnValue(userPayload);

    //     jest
    //       .spyOn(SessionService, "createSession")
    //       // @ts-ignore
    //       .mockReturnValue(sessionPayload);

    //     const req = {
    //       get: () => {
    //         return "a user agent";
    //       },
    //       body: {
    //         email: "test@example.com",
    //         password: "Password",
    //       },
    //     };

    //     const send = jest.fn();

    //     const res = { send };

    //     // @ts-ignore
    //     await createUserSessionHandler(req, res);

    //     expect(send).toHaveBeenCalledWith({
    //       accessToken: expect.any(String),
    //       refreshToken: expect.any(String),
    //     });
    //   });
    // });
  });
});
