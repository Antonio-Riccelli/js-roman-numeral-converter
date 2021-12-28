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
          actual.payload.forEach((quote) =>
            expect(quote).toStrictEqual({
              id: expect.any(Number),
              author: expect.any(String),
              quote: expect.any(String)
            })
          );
        });
    });
})

