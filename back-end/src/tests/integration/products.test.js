const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { Product } = require('../../database/models');
const sinon = require('sinon');
const app = require('../../api/app');
const { expect } = chai;

chai.use(chaiHttp);

describe('The /products routes:', function () {
  afterEach(() => sinon.restore());

  it('Returns the products in the database on GET /products', async function () {
    const productsInDB = [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: 2.20,
        url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
    ];

    sinon.stub(Product, 'findAll').resolves(productsInDB);
    sinon.stub(jwt, 'verify').returns({ data: 'valid token' })

    const chaiHttpResponse = await chai
      .request(app)
      .get('/products')
      .set('Authorization', 'token');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(productsInDB);

  })
});