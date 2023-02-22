const { expect } = require('chai');
const sinon = require('sinon');
const { validateRegisterInputs } = require('../../middlewares/credentialsValidations');

describe('The credentials validation middleware:', function () {
  it('Throws an error any of the required fields is not sent', function () {
    const invalidName = {
      body: {
        name: '',
        email: 'test@test.com',
        password: '12345'
      } 
    }
    
    try {
      validateRegisterInputs(invalidName, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Invalid empty fields');
    }
    const invalidEmail = {
      body: {
        name: 'Arthur Philip Dent',
        email: '',
        password: '12345'
      } 
    }
    
    try {
      validateRegisterInputs(invalidEmail, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Invalid empty fields');
    }

    const invalidPassword = {
      body: {
        name: 'Arthur Philip Dent',
        email: 'test@test.com',
        password: ''
      } 
    }
    
    try {
      validateRegisterInputs(invalidPassword, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Invalid empty fields');
    }
  });

  it('Throws an error if the username is not in the correct format', function () {
    const invalidRequest = {
      body: {
        name: 'Bad name',
        email: 'test@test.com',
        password: '123456'
      } 
    }
    
    try {
      validateRegisterInputs(invalidRequest, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Username must have at least 12 characters');
    }
  });

  it('Throws an error if the email is not in the correct format', function () {
    const invalidRequest = {
      body: {
        name: 'Arthur Philip Dent',
        email: 'test.com',
        password: '123456'
      } 
    }
    
    try {
      validateRegisterInputs(invalidRequest, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Invalid email');
    }
  });

  it('Throws an error if the password is not in the correct format', function () {
    const invalidRequest = {
      body: {
        name: 'Arthur Philip Dent',
        email: 'test@test.com',
        password: '12345'
      } 
    }
    
    try {
      validateRegisterInputs(invalidRequest, {}, () => {});
    } catch (error) {
      expect(error.message).to.be.equal('Password must have at least 6 characters');
    }
  });

  it('Successfully calls the next function if the required fields are valid', function() {
    const validRequest = { 
      body: {
        name: 'Arthur Philip Dent',
        email: 'test@test.com',
        password: '123456'
      } 
    }
    
    const next = sinon.stub()

    validateRegisterInputs(validRequest, {}, next)
    
    sinon.assert.called(next)
  });
});