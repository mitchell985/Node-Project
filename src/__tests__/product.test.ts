import supertest from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";
import { MongoMemoryServer } from "mongodb-memory-server";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const productPayload = {
  user: userId,
  title: "Panasonic GH5 DSLR with 12-35mm Lens",
  description:
    "The LUMIX GH5 packs a real punch with its high performance Digital Live MOS sensor sporting a whopping 20.3 megapixels to achieve the ultimate picture quality in the history of LUMIX G digital cameras. Together with the removal of the low-pass filter from the sensor, you can confidently capture the sharpest every imagery with high dynamic range and artefact free. The LUMIX GH5 is a camera of beauty created by you and crafted by Panasonic engineering",
  price: 1699.99,
  image:
    "https://www.photowarehouse.co.nz/assets/pi/i8/1017268__ScaleHeightWzgzNl0.jpg?title=1017268.jpg-panasonic-lumix-dc-gh5-mk-ii-body&time=1636070350",
};

const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

const jwt = signJwt(userPayload);

describe("product", () => {
  //creating mongodb instance in memory, for mocking inputs see user.test.ts
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  //GET route
  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const productId = "product-123";

        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });
    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);

        expect(body.productId).toBe(product.productId);
      });
    });
  });

  //POST route
  describe("create product route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/products");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and create the product", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/products")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description:
            "The LUMIX GH5 packs a real punch with its high performance Digital Live MOS sensor sporting a whopping 20.3 megapixels to achieve the ultimate picture quality in the history of LUMIX G digital cameras. Together with the removal of the low-pass filter from the sensor, you can confidently capture the sharpest every imagery with high dynamic range and artefact free. The LUMIX GH5 is a camera of beauty created by you and crafted by Panasonic engineering",
          image:
            "https://www.photowarehouse.co.nz/assets/pi/i8/1017268__ScaleHeightWzgzNl0.jpg?title=1017268.jpg-panasonic-lumix-dc-gh5-mk-ii-body&time=1636070350",
          price: 1699.99,
          productId: expect.any(String),
          title: "Panasonic GH5 DSLR with 12-35mm Lens",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });

  //PUT route
  describe("put product route", () => {
    describe("given the user is not logged in and there is no product", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app)
          .put(`/api/products/product-123`)
          .send({ ...productPayload, price: 1000 });

        //Forbidden
        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in, but the product submitted is invalid", () => {
      it("should return a 400", async () => {
        const product = await createProduct(productPayload);

        const { statusCode } = await supertest(app)
          .put(`/api/products/${product.productId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send({});

        //Bad request
        expect(statusCode).toBe(400);
      });
    });
    describe("given the user is logged in, but the product is not found", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .put(`/api/products/product-123`)
          .set("Authorization", `Bearer ${jwt}`)
          .send({ ...productPayload, price: 1000 });

        //Not found
        expect(statusCode).toBe(404);
      });
    });
    describe("given the product exists but a different user try's to modify it", () => {
      it("should return a 403", async () => {
        //Create the product
        const product = await createProduct(productPayload);

        //Create a new signed token for a new user
        const newJwt = signJwt({
          ...userPayload,
          _id: new mongoose.Types.ObjectId().toString(),
        });

        const { statusCode } = await supertest(app)
          .put(`/api/products/${product.productId}`)
          .set("Authorization", `Bearer ${newJwt}`)
          .send({ ...productPayload, price: 1000 });

        //Bad request
        expect(statusCode).toBe(403);
      });
    });
    describe("given the product exists and the user is logged in", () => {
      it("should be able to be able to be updated", async () => {
        const product = await createProduct(productPayload);

        const { statusCode, body } = await supertest(app)
          .put(`/api/products/${product.productId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send({ ...productPayload, price: 1000 });

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description:
            "The LUMIX GH5 packs a real punch with its high performance Digital Live MOS sensor sporting a whopping 20.3 megapixels to achieve the ultimate picture quality in the history of LUMIX G digital cameras. Together with the removal of the low-pass filter from the sensor, you can confidently capture the sharpest every imagery with high dynamic range and artefact free. The LUMIX GH5 is a camera of beauty created by you and crafted by Panasonic engineering",
          image:
            "https://www.photowarehouse.co.nz/assets/pi/i8/1017268__ScaleHeightWzgzNl0.jpg?title=1017268.jpg-panasonic-lumix-dc-gh5-mk-ii-body&time=1636070350",
          price: 1000,
          productId: expect.any(String),
          title: "Panasonic GH5 DSLR with 12-35mm Lens",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
  //DELETE route
  describe("put product route", () => {
    describe("given the user is not logged in and there is no product", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/products/product-123`)
          .send({ ...productPayload, price: 1000 });

        //Forbidden
        expect(statusCode).toBe(403);
      });
    });
  });
  describe("given the user is logged in, but the product is not found", () => {
    it("should return a 404", async () => {
      const { statusCode } = await supertest(app)
        .delete(`/api/products/product-123`)
        .set("Authorization", `Bearer ${jwt}`);

      //Not found
      expect(statusCode).toBe(404);
    });
  });
  describe("given the product exists but a different user try's to modify it", () => {
    it("should return a 403", async () => {
      //Create the product
      const product = await createProduct(productPayload);

      //Create a new signed token for a new user
      const newJwt = signJwt({
        ...userPayload,
        _id: new mongoose.Types.ObjectId().toString(),
      });

      const { statusCode } = await supertest(app)
        .delete(`/api/products/${product.productId}`)
        .set("Authorization", `Bearer ${newJwt}`);

      //Bad request
      expect(statusCode).toBe(403);
    });
  });
  describe("given the user is not logged in and there is no product", () => {
    it("should return a 200 and the product get should return 404", async () => {
      const product = await createProduct(productPayload);

      const { statusCode } = await supertest(app)
        .delete(`/api/products/${product.productId}`)
        .set("Authorization", `Bearer ${jwt}`);

      //Delete successful
      expect(statusCode).toBe(200);

      //Product is gone
      await supertest(app)
        .get(`/api/products/${product.productId}`)
        .expect(404);
    });
  });
});
