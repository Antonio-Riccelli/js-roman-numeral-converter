import app from "../app";
import request from "supertest";

describe("checking get /users response", function () {
  test("testing get request to /users ", async function () {
    //arrange
    //act
    //assert
    await request(app)
      .get("/users")
      .expect(200)
      .expect(function (res) {
        const actual = res.body;
        const expected = {
          success: true,
          message: expect.any(String),
          payload: expect.any(Array),
        };
        expect(actual).toStrictEqual(expected);
      });
  });

  test("testing get request to /users/4", async function () {
    await request(app)
      .get("/users/4")
      .expect(200)
      .expect(async function (res) {
        const actual = await res.body;
        const expected = {
          success: true,
          payload: {
            id: expect.any(Number),
            message: expect.any(String),
            payload: expect.any(Array)
          },
        };
        expect(actual).toStrictEqual(expected);
      });
  });
});