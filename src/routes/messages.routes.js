const express = require("express");
const { getUserMessages, sendMessage } = require("../controllers/message");

const router = express.Router();

router.get("/:senderId", getUserMessages);
router.post("/", sendMessage)

module.exports = router
