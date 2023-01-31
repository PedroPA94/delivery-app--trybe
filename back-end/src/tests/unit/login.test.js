const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');
const app = require('../../api/app');
const loginService = require('../../services/loginService');
const { loginServiceResult, userFindOne, loginServiceCustomer } = require('../mocks/loginMock');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { expect } = chai;

chai.use(chaiHttp);

describe("Login Service", () => {
  // describe("Successful answers", () => {
  //   afterEach(() => sinon.restore());

  //   it("should find the user successfully", async () => {
  //     sinon.stub(User, 'findOne').resolves({dataValues: userFindOne});
  //     sinon.stub(jwt, "sign").callsFake(() => {
  //       return Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX")
  //     });
  //     const result = await loginService.doLogin(
  //       "zebirita@email.com",
  //       "$#zebirita#$",
  //     );

  //     expect(result).to.be.deep.equal(loginServiceCustomer);
  //   });
  // });

  describe("Client errors", () => {
    afterEach(() => sinon.restore());

    it(`shouldn't work if the password is incorrect`, async () => {
      sinon.stub(User, 'findOne').resolves(userFindOne);
      
      const response = await chai.request(app).post("/login").send({
        email: "zebirita@email.com",
        password: "123456",
      });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect password");
    });

    it(`shouldn't work if the email don't exits`, async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const response = await chai.request(app).post("/login").send({
        email: "test@email.com",
        password: "123456",
      });

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal("User not found");
    });
  });
});
