const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const { validateToken } = require('../../middlewares/validateToken');

describe('The token validation middleware:', function () {
  afterEach(() => sinon.restore());

  it('Correctly validates a valid token', async function () {
    const validRequest = { 
      headers: { authorization: 'token' }, 
      body: {}
    }

    sinon.stub(jwt, 'verify').returns({ data: 'valid token' })
    const next = sinon.stub()

    validateToken(validRequest, {}, next)
    
    sinon.assert.called(next)
  });

  it('Throws an error if no token is found', async function () {
    const validRequest = { 
      headers: { authorization: '' }, 
      body: {}
    }

    try {
      validateToken(validRequest, {}, '')
    } catch (error) {
      expect(error.message).to.be.equal('Token not found')
    }
  });

  it('Throws an error if the token is expired or invalid', async function () {
    const validRequest = { 
      headers: { authorization: 'token' }, 
      body: {}
    }

    sinon.stub(jwt, 'verify').returns({})

    try {
      validateToken(validRequest, {}, '')
    } catch (error) {
      expect(error.message).to.be.equal('Expired or invalid token')
    }
  });
});