import createServer from "../utils/server";
import supertest from "supertest";

const app = createServer();

describe("index", () => {
  describe("get index route", () => {
    describe("given the application is running correctly", () => {
      it("should return a 200", async () => {
        await supertest(app).get(`/`).expect(200);
      });
    });
  });
});
