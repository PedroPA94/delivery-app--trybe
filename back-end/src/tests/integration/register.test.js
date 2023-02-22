const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');
const sinon = require('sinon');
const app = require('../../api/app');
const { expect } = chai;
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('The /register routes:', function () {
  afterEach(() => sinon.restore());

  it('Registers a new user on POST /seller', async function () {
    sinon.stub(User, 'findOne').resolves();
    sinon.stub(User, 'create').resolves();
    sinon.stub(jwt, 'sign').returns('Some token');
    
    const requestData = {
      name: 'Big Name To Be Tested',
      email: 'test@test.com',
      password: 's3cr3t'
    }

    const expected = {
      name: 'Big Name To Be Tested',
      email: 'test@test.com',
      role: 'customer',
      token: 'Some token'
    }

    const chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(requestData);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(expected);
  });
});