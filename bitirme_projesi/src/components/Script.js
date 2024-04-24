import FaceOutlined from "@mui/icons-material/FaceOutlined";

export default function Aichat() {
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  const chatbox = document.querySelector(".chatbox");

  if (!chatInput || !sendChatBtn) {
    console.error("Chat input or send button not found.");
    return;
  }

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent;
    if (className === "outgoing") {
      chatContent = `<p>${message}</p>`;
    } else {
      chatContent = `<div class="face"> <FaceOutlined sx={{ marginTop: "4.5px" }} /> </div> <p>${message}</p>`;
    }

    chatLi.innerHTML = chatContent;
    return chatLi;
  };

  const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";

    setTimeout(() => {
      chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    }, 600);
  };

  sendChatBtn.addEventListener("click", handleChat);
}
