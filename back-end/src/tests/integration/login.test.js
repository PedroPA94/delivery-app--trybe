const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');
const app = require('../../api/app');
const md5 = require('md5');
const { expect } = chai;

chai.use(chaiHttp);

const userInfo = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'
};

describe("Test /login routes", () => {
  describe("Successful answers", () => {
    afterEach(() => sinon.restore());

    it("The POST method should return status 200 with a token", async () => {
      sinon.stub(User, 'findOne').resolves({ dataValues: userInfo});
      chai.assert.equal('1c37466c159755ce1fa181bd247cb925', md5('$#zebirita#$'));

      const response = await chai.request(app).post("/login").send({
        email: "zebirita@email.com",
        password: "$#zebirita#$",
      });
      console.log(response.error);
      expect(response.status).to.be.equal(200);
      expect(response.body.token).to.exist();
    });
  });

  // describe("Client errors", () => {
  //   beforeEach(async () => {
  //     sinon.stub(User, "findOne").resolves(null);
  //   });

  //   afterEach(() => {
  //     (User.findOne).restore();
  //   });

  //   it(`shouldn't work if the email field is missing`, async () => {
  //     const response = await chai.request(app).post("/login").send({
  //       password: "123456",
  //     });

  //     expect(response.status).to.be.equal(400);
  //     expect(response.body.message).to.be.equal("All fields must be filled");
  //   });
  // });
});
