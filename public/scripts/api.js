async function sendMessage(message, senderId, senderType) {
  const response = await fetch("/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ message, senderId, senderType }),
  });
  console.log(response);
}
async function checkoutOrder(orderItems) {
  const userId = localStorage.getItem("senderId");
  if (userId) {
    const response = await fetch("/order/add", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ orderItems, userId }),
    });
    console.log(response);
  }
}

async function getOrderHistory() {
  const userId = localStorage.getItem("senderId");
  if (userId) {
    await fetch(`order/${userId}`);
  }
}
