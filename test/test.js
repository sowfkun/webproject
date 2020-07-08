var app = require("../").app;
var server = require("../").server;
var request = require("supertest").agent(server);

describe("GET /", function () {

    after(function (done) {
        server.close();
        done();
    });

    it("expect status 200", function (done) {
        request
            .get("/")
            .expect(200)
            .end(done);
    });
});
