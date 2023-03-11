const {model, Schema} = require("mongoose")

const OrderSchema = Schema(
    {
        userId: {
            type: String,
            required: true
        },
        item: {
            type: [String],
            required: true
        }
    }
)

const OrderModel = model("Order", OrderSchema)

module.exports = OrderModel