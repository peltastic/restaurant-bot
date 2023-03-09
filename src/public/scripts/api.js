async function sendMessage(message, senderId, senderType) {
  const response = await fetch("/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ message, senderId, senderType }),
  });
  console.log(response);
}
