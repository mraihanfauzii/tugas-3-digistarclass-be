const orderUsecase = require('../domain/usecases/order_usecase');

// Fungsi handler untuk membuat order
async function create(req, res) {
  try {
    const orderData = req.body;
    const userId = req.user.userId; // Ambil userId dari JWT yang terotentikasi
    orderData.created_by = userId; // Isi field `created_by` dengan userId
    const createdOrder = await orderUsecase.create(orderData);
    res.status(201).json({ message: 'Order berhasil dibuat', order: createdOrder });
  } catch (error) {
    console.error('Error membuat order:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get list of orders
async function getList(req, res) {
  try {
    const orders = await orderUsecase.getList();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get an order by order id
async function getOneByOrderId(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderUsecase.getOneByOrderId(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update an order by ID
async function updateOne(req, res) {
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    const updatedOrder = await orderUsecase.updateOne(orderId, updateData);
    res.json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete an order by ID
async function deleteOne(req, res) {
  try {
    const orderId = req.params.id;
    const deletedOrder = await orderUsecase.deleteOne(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getOneByOrderId, updateOne, deleteOne };