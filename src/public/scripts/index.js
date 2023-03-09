const socket = io();

const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector("#message-input");
const chatBody = document.querySelector(".chat-body");

let inputValue;

let senderId = localStorage.getItem("senderId");
function showMessage(value) {
  const fragment = document.createDocumentFragment();
  const messageEl = fragment
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("p"));
  messageEl.parentElement.className = "right";
  messageEl.textContent = value;

  chatBody.appendChild(fragment);
  // chatBody.scrollIntoView({behavior: "smooth"})
  chatBody.scrollTo(0, chatBody.scrollHeight);
}

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // sendMessage(inputValue, senderId, "user");
  if (input.value) {
    inputValue = input.value
    showMessage(input.value);
    socket.emit("send message", input.value);
  }
});

socket.on("bot response", (response) => {
  if (typeof response.response === "object") {
    const div = document.createElement("div");
    div.className = "left"
    for (const el of response.response) {
      const p = document.createElement("p")
      p.textContent = el
      div.appendChild(p)
    }
    chatBody.appendChild(div)
    return
  }
  const rightfragment = document.createDocumentFragment();
  const rightMessageEl = rightfragment.appendChild(
    document.createElement("div")
  ).appendChild(document.createElement("p"));
  rightMessageEl.parentElement.className = "left";
  rightMessageEl.textContent = response.response;
  chatBody.appendChild(rightfragment);
  chatBody.scrollTo(0, chatBody.scrollHeight);
});
