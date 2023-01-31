const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const loginService = require('../../services/loginService');
const { loginServiceResult, userFindOne } = require('../mocks/loginMock');
const { expect } = chai;

chai.use(chaiHttp);

describe("Test /login routes", () => {
  describe("Successful answers", () => {
    afterEach(() => sinon.restore());

    it("The POST method should return status 200 with a token", async () => {
      sinon.stub(loginService, 'doLogin').resolves(loginServiceResult);

      const response = await chai.request(app).post("/login").send({
        email: "zebirita@email.com",
        password: "$#zebirita#$",
      });

      expect(response.status).to.be.equal(200);
      expect(response.body.token).to.exist;
    });
  });

  describe("Client errors", () => {
    afterEach(() => sinon.restore());

    it(`shouldn't work if the email field is missing`, async () => {
      const response = await chai.request(app).post("/login").send({
        password: "123456",
      });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal("Invalid empty fields");
    });

    it(`shouldn't work if the email is invalid`, async () => {
      const response = await chai.request(app).post("/login").send({
        email: "testemail.com",
        password: "123456",
      });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal("Invalid email");
    });
  });
});
