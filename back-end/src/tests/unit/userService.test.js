
const { User } = require('../../database/models');
const userService = require('../../services/userService');
const sinon = require('sinon');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

describe('Testing userService:', function() {
  describe('The "create" function:', function() {
    afterEach(() => sinon.restore());

    it('Successfully creates a user', async function() {
      sinon.stub(User, 'findOne').resolves();
      sinon.stub(User, 'create').resolves();
      sinon.stub(jwt, 'sign').returns('Some token');
      
      const requestData = {
        name: 'Test user',
        email: 'test@test.com',
        password: 's3cr3t'
      }
  
      const expected = {
        name: 'Test user',
        email: 'test@test.com',
        role: 'customer',
        token: 'Some token'
      }
  
      const result = await userService.create(requestData);
  
      expect(result).to.be.deep.equal(expected);
    });

    it('Throws an error if the user already exists', async function() {
      sinon.stub(User, 'findOne').resolves({});

      const requestData = {
        name: 'Test user',
        email: 'test@test.com',
        password: 's3cr3t'
      };

      const expectedError = 'User already exist';

      try {
        await userService.create(requestData);
      } catch (error) {
        expect(error.message).to.be.equal(expectedError);
      }
    });
  });

  describe('The "getSellers" function:', function() {
    afterEach(() => sinon.restore());

    it('Returns a list of sellers with the expected properties', async function() {
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

      sinon.stub(User, 'findAll').resolves(sellersInDB)

      const expected = [
        {
          id: 2,
          name: 'Fulana Pereira'
        }
      ];

      const result = await userService.getSellers();

      expect(result).to.be.deep.equal(expected);
      expect(result[0]).to.not.have.property('email');
      expect(result[0]).to.not.have.property('password');
      expect(result[0]).to.not.have.property('role');
    });
  });

  describe('The "getUsers" function:', function() {
    afterEach(() => sinon.restore());

    it('Returns a list of users', async function() {
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

      sinon.stub(User, 'findAll').resolves(usersInDB)

      const result = await userService.getUsers();

      expect(result).to.be.deep.equal(usersInDB);
    });
  });
});
