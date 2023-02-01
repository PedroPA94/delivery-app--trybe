const { Sale, SalesProduct, User, Product } = require('../database/models');

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

const getAllSales = async () => Sale.findAll({
  attributes: ['id',
   'status',
   'saleDate', 
   'totalPrice', 
   'deliveryAddress'],
});

  async function getDetailedSale(saleId) {
  const data = await SalesProduct.findAll({
    where: { saleId },
    include: [
      { model: Product,
        as: 'product',
        attributes: 
        ['id',
        'name',
        'price'],
      },
      {
        model: Sale,
        as: 'sale',
        attributes: { exclude: ['id'] },
      }],
  });
  return data;
}

module.exports = {
  createSale,
  getDetailedSale,
  getAllSales,
  updateSaleStatus,
};
