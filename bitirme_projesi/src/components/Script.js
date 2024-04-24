import FaceOutlined from "@mui/icons-material/FaceOutlined";

export default function Aichat() {
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  const chatbox = document.querySelector(".chatbox");
  let userMessage;
  const API_KEY = "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";

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

  const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p")

    const requestOptions = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user","content": userMessage}]
      })
    };

    fetch(API_URL,requestOptions).then(res => res.json()).then(data => {
      messageElement.textContent = data.choices[0].message.content;
    }).catch((error) =>
        messageElement.textContent = "Ooops! Something went wrong. Please try again."
    )
  };

  const handleChat = () => {
   userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";

    setTimeout(() => {
      const incomingChatLi= createChatLi("Thinking...", "incoming")
      chatbox.appendChild(incomingChatLi);
      generateResponse(incomingChatLi);
    }, 600);
  };

  sendChatBtn.addEventListener("click", handleChat);
}
