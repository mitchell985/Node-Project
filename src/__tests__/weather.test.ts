import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("weather", () => {
  describe("get weather route", () => {
    describe("given the city can be found", () => {
      it("should return a 200 and the local weather", async () => {
        const city = "Auckland";

        const { body, statusCode } = await supertest(app).get(
          `/api/weather/city?cityName=${city}`
        );

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          city: {
            cityName: "Auckland, New Zealand",
            latitude: -36.85088270000001,
            longitude: 174.7644881,
          },
          distanceToLocation: expect.any(Number),
          temperature: expect.any(Number),
          weatherPhrase:
            expect.any(String) && expect.not.stringMatching("undefined"),
          windspeed: expect.any(Number),
        });
      });
    });
    describe("given the city can't be found", () => {
      it("should return a 400", async () => {
        const city = "";

        const { statusCode } = await supertest(app).get(
          `/api/weather/city?cityName=${city}`
        );

        expect(statusCode).toBe(400);
      });
    });
  });
});
