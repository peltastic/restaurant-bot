const OrderModel = require("../models/orderModel");

const addOrder = async (req, res) => {
  const { orderItems, userId } = req.body;
  try {
    const hasOrdered = await OrderModel.findOne({ userId });
    if (hasOrdered) {
      for (const el of orderItems) {
        await OrderModel.updateOne(
          {
            userId,
          },
          {
            $push: { item: el },
          }
        );
      }
    } else {
      await OrderModel.create({
        userId,
        item: orderItems,
      });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(200).send("Order Saved");
};

const getOrders = async (req, res) => {
  const {userId} = req.params;
  const orders = await OrderModel.findOne({ userId });
  const orderItemsOccurenceObj = {};
  const result = []
  for (let a = 0; a < orders?.item.length; a++) {
    const b = orders?.item[a];
    if (orderItemsOccurenceObj[b]) {
      orderItemsOccurenceObj[b] += 1;
    } else {
      orderItemsOccurenceObj[b] = 1;
    }
  }
  for (const item in orderItemsOccurenceObj) {
    result.push(`${item} x${orderItemsOccurenceObj[item]}`)
  }
  socket.emit("order history", result)
  return res.status(200).send("orders retrieved")
};

module.exports = { addOrder, getOrders };
