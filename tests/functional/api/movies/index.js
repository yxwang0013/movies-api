import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

const currentMovieId = 590706;


let token;

const sampleMovie = {
  id: 337401,
  title: "Mulan",
};


describe("Movies endpoint", function () {
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
    api.close();
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

  describe("GET /movies/:id/reviews", () => {

    it("should return the matching movie reviews", () => {
      return request(api)
        .get(`/api/movies/${sampleMovie.id}/reviews`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);


        });
    });

  });

  describe("Delete /movies/:id", () => {
    describe("when the movie exists", () => {
      it("should return 200 and delete successfully", () => {
        return request(api)
          .delete(`/api/movies/${currentMovieId}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
      });
    })
  });
});
