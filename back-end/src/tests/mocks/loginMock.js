const loginServiceResult = {
  email: "email@test.com",
  name: "Customer Example Name",
  role: "customer",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
};

const loginServiceCustomer = {
  email: 'zebirita@email.com',
  name: 'Cliente Zé Birita',
  role: 'customer',
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
}

const userFindOne = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'
};

module.exports = {
  loginServiceResult,
  loginServiceCustomer,
  userFindOne,
};
