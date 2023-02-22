const { expect } = require('chai');
const sinon = require('sinon');
const { validateAdmin } = require('../../middlewares/validateAdmin');

describe('The admin validation middleware:', function () {
  afterEach(() => sinon.restore());

  it('Correctly validates an admin user', async function () {
    const validRequest = { 
      body: {
        user: {
          role: 'administrator'
        }
      }
    }
    const next = sinon.stub()

    validateAdmin(validRequest, {}, next)
    
    sinon.assert.called(next)
  });

  it('Throws an error if the user is not an admin', async function () {
    const invalidRequest = { 
      body: {
        user: {
          role: 'customer'
        }
      }
    }

    try {
      validateAdmin(invalidRequest, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Unauthorized');
    }
  });
});