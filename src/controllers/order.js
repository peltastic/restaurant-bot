const OrderModel = require("../models/orderModel");

const addOrder = async  (req, res) => {
  const { orderItem, userId } = req.body;
  await OrderModel.updateOne(
    {
      userId,
    },
    {
      $push: { item: orderItem },
    }
  );
  return res.status(200).send("Order Saved")

};
