const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');
const sinon = require('sinon');
const app = require('../../api/app');
const { expect } = chai;

chai.use(chaiHttp);

describe('The /seller routes:', function () {
  afterEach(() => sinon.restore());

  it('Returns the sellers in the database on GET /seller', async function () {
    const sellersInDB = [
      {
        dataValues: {
          id: 2,
          name: 'Fulana Pereira',
          email: 'fulana@deliveryapp.com',
          password: '3c28d2b0881bf46457a853e0b07531c6',
          role: 'seller'
        }
      }
    ]

    const expected = [{
      id: 2,
      name: 'Fulana Pereira',
    }]

    sinon.stub(User, 'findAll').resolves(sellersInDB);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/seller')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(expected);
  });
});