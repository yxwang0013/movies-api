import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

const currentMovieId = 590706 ;
const currentMovieTitle = "Jiu Jitsu";

//let api;
let token;

const sampleMovie = {
  id: 337401,
  title: "Mulan",
};


describe("Movies endpoint", function () {
  // beforeEach(() => {
  //   try {
  //     api = require("../../../../index");
  //   } catch (err) {
  //     console.error(`failed to Load user Data: ${err}`);
  //   }
  // });
  this.timeout(6400);
  before((done) => {
    setTimeout(() => {
      done();
    }, 5000);
  });
  before((done) => {
    request(api)
      .post("/api/users")
      .send({
        "username": "user1",
        "password": "test1"
      })
      .end((err, res) => {
        token = res.body.token;
        console.log(token);
        done();
      });
  });

  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /movies ", () => {
    describe("when the token is valid", () => {
      it("should check token and return the 20 movies", (done) => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(20);
            done();
          });
      });
    });
    describe("when the token is invalid", () => {
      it("should return 401 and Unauthorized", (done) => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });
  });


  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return an empty array", () => {
        return request(api)
          .get(`/api/movies/9999`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({});
      });
    });
  });
  

});
