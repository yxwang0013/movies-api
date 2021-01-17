import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let api;
let token;

const sampleMovie = {
  id: 529203,
  title:"The Croods: A New Age",
};

describe("Now_playing Movies endpoint", () => {
  beforeEach(function(done) {
    this.timeout(6000)
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(()=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res) =>{
        token= res.body.token;
        done();
      });
    },4000)
  });

  afterEach(() => {
    api.close(); 
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /Now_playing ", () => {
    it("should return 20 Now_playing movies and a status 200", (done) => {
      request(api)
        .get("/api/Now_playing")
        .set("Accept", "application/json")
        .set("Authorization",token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /Now_playing/:id", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/Now_playing/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
  });
});
