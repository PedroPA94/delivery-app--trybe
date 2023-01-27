const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');
const { User } = require('../database/models');

const createSalesProdutcs = async (saleId, cart) => {
  const newSalesProducts = cart.map((item) => {
    const newRegister = SalesProduct.create({
      saleId,
      productId: item.id,
      quantity: item.quantity,
    });

    return newRegister;
  });
  await Promise.all(newSalesProducts);
};

const createSale = async (data) => {
  const { cart, totalPrice, sellerId, deliveryAddress, deliveryNumber, userEmail } = data;

  const user = await User.findOne({ where: { email: userEmail } });

  const newSale = await Sale.create({
    userId: user.id,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });

  await createSalesProdutcs(newSale.id, cart);

  return newSale.id;
};

const updateSaleStatus = async (id, status) => {
  const result = await Sale.update({ status }, { where: { id } });
  return result;
};

module.exports = {
  createSale,
  updateSaleStatus,
};
