import chai from "chai";
import request from "supertest";
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const mongoose = require("mongoose");
const expect = chai.expect;

let db;

let token;
let id;



const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Users endpoint", () => {
  before((done) => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
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

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {

      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new user.' });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2", "user3"]);
        });
    });
  });
  describe('PUT /:id ', () => {
    before(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          const ids = res.body.map(user => user._id)
          id = ids[0]
        });
    })
    it('When id is invalid', () => {
      return request(api)
        .put("/api/users/123")
        .set("Accept", "application/json")
        .expect(500)
    })
    it('When id is valid and body is valid', () => {
      return request(api)
        .put(`/api/users/${id}`)
        .set("Accept", "application/json")
        .send({
          username: 'user',
          password: 'Aa111111111'
        })
        .expect(200)
    })
  })



  describe("POST /:username/favourites ", () => {
    it("should return a 401 status with a invaild movie id", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "602211",
        });
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "602211",
        })
        .expect(401);

    });
    it("should return a 201 status with a vaild movie id", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "729648",
        })
        .expect(201);

    });
  });

  describe("POST /:username /watchlist ", () => {
    it("should return a 401 status with a invaild movie id", () => {
      request(api)
        .post(`/api/users/user2/watchlist?action=register`)
        .send({
          id: "729648",
        });
      request(api)
        .post(`/api/users/user2/watchlist?action=register`)
        .send({
          id: "729648",
        })
        .expect(401);
    });

    it("should return a 201 status with a vaild watchlist movie id", () => {
      request(api)
        .post(`/api/users/user2/watchlist?action=register`)
        .send({
          id: "602211",
        })
        .expect(201);
    });
  });
});
