const express = require("express")
const {addOrder, getOrders} = require("../controllers/order")

const router = express()

router.post("/add", addOrder)
router.get("/:userId", getOrders)

module.exports = router