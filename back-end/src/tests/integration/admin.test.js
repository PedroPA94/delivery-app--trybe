const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');
const sinon = require('sinon');
const app = require('../../api/app');
const { expect } = chai;
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('The /admin routes:', function () {
  beforeEach(() => {
    sinon.stub(jwt, 'verify').returns({ data: { role: 'administrator' }})
  })
  
  afterEach(() => sinon.restore());
  
  it('Registers a new user on POST /admin', async function () {
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
      .post('/admin')
      .send(requestData)
      .set('Authorization', 'token');

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(expected);
  });

  it('Returns a list of all users on GET /admin', async function () {
    const usersInDB = [
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller'
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer'
      },
    ]
    
    sinon.stub(User, 'findAll').resolves(usersInDB);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/admin')
      .set('Authorization', 'token');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(usersInDB);
  });

  it('Deletes a user on DELETE /admin/:id', async function () {   
    sinon.stub(User, 'destroy').resolves();

    const chaiHttpResponse = await chai
      .request(app)
      .delete('/admin/1')
      .set('Authorization', 'token');

      expect(chaiHttpResponse.status).to.be.equal(201);
  });
});