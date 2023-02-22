const chai = require('chai');
const chaiHttp = require('chai-http');
const { User, Sale, SalesProduct } = require('../../database/models');
const sinon = require('sinon');
const app = require('../../api/app');
const { expect } = chai;

chai.use(chaiHttp);

describe('The /sale routes:', function () {
  afterEach(() => sinon.restore());

  it('Creates a new sale on POST /sale', async function () {
    const requestData = {
      sellerId: 2,
      totalPrice: 42,
      deliveryAddress: 'Elm Street',
      deliveryNumber: '666',
      cart: [
        {
          id: 1,
          quantity: 20
        }
      ]
    }

    sinon.stub(User, 'findOne').resolves({ id: 1 });
    sinon.stub(Sale, 'create').resolves({ id: 1 });
    sinon.stub(SalesProduct, 'create').resolves();

    const chaiHttpResponse = await chai
      .request(app)
      .post('/sale')
      .send(requestData);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal({ saleId: 1 });
  });

  it('Updates a sale status on PUT /sale/orders', async function () {
    const requestData = {
      saleId: 1,
      status: 'Entregue'
    }
    
    const updatedSale = { 
      id: 1,
      sellerId: 2,
      totalPrice: 42,
      deliveryAddress: 'Elm Street',
      deliveryNumber: '666',
      status: 'Entregue'
    }

    sinon.stub(Sale, 'update').resolves(updatedSale);

    const chaiHttpResponse = await chai
      .request(app)
      .put('/sale/orders')
      .send(requestData);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(updatedSale);
  });
});