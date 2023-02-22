
const { User, Sale, SalesProduct } = require('../../database/models');
const saleService = require('../../services/saleService');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Testing saleService:', function() {
  describe('The "createSale" function:', function() {
    afterEach(() => sinon.restore());

    it('Successfully creates a sale', async function() {
      const user = { id: 1 }

      const newSale = { id: 1 }

      sinon.stub(User, 'findOne').resolves(user);
      sinon.stub(Sale, 'create').resolves(newSale);
      sinon.stub(SalesProduct, 'create').resolves();
      
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
  
      const result = await saleService.createSale(requestData);
  
      expect(result).to.be.equal(1);
    });
  });

  describe('The "updateSaleStatus" function:', function() {
    afterEach(() => sinon.restore());

    it('Successfully updates a sale status', async function() {
      const updatedSale = { 
        id: 1,
        sellerId: 2,
        totalPrice: 42,
        deliveryAddress: 'Elm Street',
        deliveryNumber: '666',
        status: 'Entregue'
      }

      sinon.stub(Sale, 'update').resolves(updatedSale);
  
      const result = await saleService.updateSaleStatus(1, 'Entregue');
  
      expect(result).to.be.deep.equal(updatedSale);
    });
  });

  describe('The "getAllSales" function:', function() {
    afterEach(() => sinon.restore());

    it('Returns all sales', async function() {
      const allSales = [{ 
        id: 1,
        sellerId: 2,
        totalPrice: 42,
        deliveryAddress: 'Elm Street',
        status: 'Entregue'
      }]

      sinon.stub(Sale, 'findAll').resolves(allSales);
  
      const result = await saleService.getAllSales();
  
      expect(result).to.be.deep.equal(allSales);
    });
  });

  describe('The "getDetailedSale" function:', function() {
    afterEach(() => sinon.restore());

    it('Returns detailed information on a given sale', async function() {
      const detailedSale = [{
        id: 1,
        product: {
          id: 1,
          name: 'Beer',
          quantity: 20
        },
        sale: {
          sellerId: 2,
          totalPrice: 42,
          deliveryAddress: 'Elm Street',
          status: 'Entregue'
        }
      }]

      sinon.stub(SalesProduct, 'findAll').resolves(detailedSale);
  
      const result = await saleService.getDetailedSale();
  
      expect(result).to.be.deep.equal(detailedSale);
    });
  });
});
