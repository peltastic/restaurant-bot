const socket = io();

const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector("#message-input");
const chatBody = document.querySelector(".chat-body");

let inputValue;
const orders = [];
const allowedInputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 97, 98, 99];

let senderId = localStorage.getItem("senderId");

function appendChat(textContent, position) {
  const fragment = document.createDocumentFragment();
  const messageEl = fragment
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("p"));
  messageEl.parentElement.className = position;
  messageEl.textContent = textContent;

  chatBody.appendChild(fragment);
  chatBody.scrollTo(0, chatBody.scrollHeight);
  // input.value = ""
}

function ordersFeed(data, type) {
  let feed = data;
  const div = document.createElement("div");
  div.className = "left";
  const heading = document.createElement("h2");
  heading.textContent = type === "current" ? "Current Orders" : "ORDER HISTORY";
  heading.className = "space-below";
  div.appendChild(heading);

  if (type === "current") {
    feed = [];
    const orderItemsOccurenceObj = {};
    for (let a = 0; a < data.length; a++) {
      const b = data[a];
      if (orderItemsOccurenceObj[b]) {
        orderItemsOccurenceObj[b] += 1;
      } else {
        orderItemsOccurenceObj[b] = 1;
      }
    }
    for (const item in orderItemsOccurenceObj) {
      feed.push(`${item} x${orderItemsOccurenceObj[item]}`);
    }
  }
  if (feed.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No orders Placed yet";
    div.appendChild(p);
  } else {
    for (const el of feed) {
      const p = document.createElement("p");
      p.textContent = el;
      div.appendChild(p);
    }
  }
  chatBody.appendChild(div);
  chatBody.scrollTo(0, chatBody.scrollHeight);
}

function validator(inputValue) {
  const rightchats = document.querySelectorAll(".right");
  const inputIsAllowed = allowedInputs.find((el) => el === Number(inputValue));
  console.log(inputIsAllowed);
  if (!inputIsAllowed) {
    return;
  }
  if (Number(inputValue) === 98) {
    appendChat(inputValue, "right");
    getOrderHistory();
    return;
  }
  if (Number(inputValue) === 97) {
    appendChat(inputValue, "right");
    ordersFeed(orders, "current");
    return;
  }
  if (Number(inputValue) > 1 && Number(inputValue) < 8 && !rightchats[0]) {
    return;
  }
  if (
    (Number(inputValue) === 0 || Number(inputValue) === 99) &&
    !rightchats[1]
  ) {
    return;
  }

  if (Number(inputValue) === 99 && orders.length > 0) {
    checkoutOrder(orders);
    return true;
  }
  return true;
}

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // sendMessage(inputValue, senderId, "user");
  if (input.value) {
    inputValue = input.value;
    const shouldContinue = validator(input.value);
    if (!shouldContinue) {
      return;
    }

    appendChat(input.value, "right");

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
    chatBody.scrollTo(0, chatBody.scrollHeight);
    return;
  }
  appendChat(response.response, "left");
});

socket.on("order history", (response) => {
  ordersFeed(response, "");
});
