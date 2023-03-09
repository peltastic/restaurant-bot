const MessageModel = require("../models/messageModel");

const getUserMessages = async (req, res) => {
  const { senderId } = req.params;
  let messageData = [];
  if (senderId) {
    messageData = await MessageModel.find({
      senderId,
    }).sort({
      updatedAt: 1,
    });
}
return res.render("index", {
  messageData,
});
};

const sendMessage = (req, res) => {
  const { message, senderId, senderType } = req.body;
  MessageModel.create({
    message,
    senderId,
    senderType: senderId ? senderType : "bot",
  });
  return res.status(200).send({
    message: "Message Sent",
  });
};

module.exports = {
  sendMessage,
  getUserMessages,
};
