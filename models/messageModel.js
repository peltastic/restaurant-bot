const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
    },
    senderType: {
      type: String,
      enum: ["user", "bot"],
    },
  },
  { timestamps: true }
);

const MessageModel = model("Message", MessageSchema);
module.exports = MessageModel;
