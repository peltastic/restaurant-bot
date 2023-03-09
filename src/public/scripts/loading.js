import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let senderId = localStorage.getItem("senderId");
if (!senderId) {
  localStorage.setItem("senderId", uuidv4());
  senderId = localStorage.getItem("senderId");
}

window.location.href = `/${senderId}`;
