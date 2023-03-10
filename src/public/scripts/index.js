const socket = io();

const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector("#message-input");
const chatBody = document.querySelector(".chat-body");

let inputValue;
const orders = [];

let senderId = localStorage.getItem("senderId");
function showMessage(value) {
  const fragment = document.createDocumentFragment();
  const messageEl = fragment
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("p"));
  messageEl.parentElement.className = "right";
  messageEl.textContent = value;

  chatBody.appendChild(fragment);
  chatBody.scrollTo(0, chatBody.scrollHeight);
}

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // sendMessage(inputValue, senderId, "user");
  if (input.value) {
    inputValue = input.value;
    const rightchats = document.querySelectorAll(".right");
    if (Number(input.value) === 98) {
      showMessage(input.value);
      getOrderHistory()
      return
    }
    if (Number(input.value) > 1 && Number(input.value) < 8 && !rightchats[0]) {
      return;
    }
    if (
      (Number(input.value) === 0 || Number(input.value) === 99) &&
      !rightchats[1]
    ) {
      return;
    }
    
    if (Number(input.value) === 99 && orders.length > 0) {
      checkoutOrder(orders);
    }
    showMessage(input.value);

    socket.emit("send message", input.value);
  }
});

socket.on("bot response", (response) => {
  if (Number(input.value) > 1 && Number(input.value) < 8) {
    orders.push(response.saveToDb);
  }
  if (typeof response.response === "object") {
    const div = document.createElement("div");
    div.className = "left";
    for (const el of response.response) {
      const p = document.createElement("p");
      p.textContent = el;
      div.appendChild(p);
    }
    chatBody.appendChild(div);
    return;
  }
  const rightfragment = document.createDocumentFragment();
  const rightMessageEl = rightfragment
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("p"));
  rightMessageEl.parentElement.className = "left";
  rightMessageEl.textContent = response.response;
  chatBody.appendChild(rightfragment);
  chatBody.scrollTo(0, chatBody.scrollHeight);
});


socket.on("order history", response => {
  ordersFeed(response, "")
})

function ordersFeed (data, type) {
  const div = document.createElement("div");
  div.className = "left";
  const heading = document.createElement("h1");
  heading.textContent = type === "current" ? "Current Orders" : "ORDER HISTORY"
  heading.className = "space-below"
  div.appendChild(heading)
  for (const el of data) {
    const p = document.createElement("p");
    p.textContent = el;
    div.appendChild(p);
  }
  chatBody.appendChild(div);
}