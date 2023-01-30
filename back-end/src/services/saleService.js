const { Sale, SalesProduct, User } = require('../database/models');

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

const getAllSales = async () => Sale.findAll({
  attributes: ['id', 'status', 'saleDate', 'totalPrice', 'deliveryAddress'],
});

const getDetailedSale = async (id) => (
  Sale.findByPk(id, {
    attributes: ['id', 'totalPrice', 'status', 'saleDate'],
    include: [
      {
        association: 'seller',
        attributes: ['name'],
      },
      {
        association: 'products',
        attributes: ['id', 'name', 'price'],
        through: { attributes: ['quantity'] },
      },
    ],
  })
);

module.exports = {
  createSale,
  getDetailedSale,
  getAllSales,
};