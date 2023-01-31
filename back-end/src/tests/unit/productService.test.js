
const { Product } = require('../../database/models');
const productService = require('../../services/productService');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Testing productService', function () {
  afterEach(() => sinon.restore());

  it('findAllProducts - Lists all products in the database', async function() {
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

    const result = await productService.findAllProducts();

    expect(result).to.be.deep.equal(productsInDB);
  });
});