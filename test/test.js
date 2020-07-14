const app = require("../index");
const supertest = require("supertest");

describe("Home", () => {
  after((done) => {
    app.close(done);
  });

  it("return status code 200", (done) => {
    supertest(app)
      .get("/")
      .expect(200, done);
  });
});