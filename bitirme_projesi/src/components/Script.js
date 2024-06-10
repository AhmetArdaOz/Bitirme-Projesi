import axios from "axios";
import FaceOutlined from "@mui/icons-material/FaceOutlined";

export default function Aichat() {
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  const chatbox = document.querySelector(".chatbox");
  let userMessage;
  const API_KEY = "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";
  const recommendationAPI = "http://127.0.0.1:5000/recommend";

  if (!chatInput || !sendChatBtn) {
    console.error("Chat input or send button not found.");
    return;
  }

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent;
    if (className === "outgoing") {
      chatContent = `<p></p>`;
    } else {
      chatContent = `<div class="face"> <FaceOutlined sx={{ marginTop: "4.5px" }} /> </div> <p></p>`;
    }

    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };

  const extractMovieTitle = (message) => {
    const phrases = ["I like", "I watched", "I enjoyed", "I loved", "I saw"];
    for (let phrase of phrases) {
      const index = message.indexOf(phrase);
      if (index !== -1) {
        const titleStart = index + phrase.length;
        const titleEnd = message.indexOf(",", titleStart);
        return message
          .slice(titleStart, titleEnd === -1 ? message.length : titleEnd)
          .trim();
      }
    }
    return message;
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.onstart = () => console.log("Speech started");
      utterance.onend = () => console.log("Speech ended");
      utterance.onerror = (event) =>
        console.error("Speech synthesis error", event);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  const generateResponse = async (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const prompts = [
      `I like ${userMessage}, suggest me one.`,
      `${userMessage} is so good, can you suggest me something like that?`,
      `Can you recommend a movie similar to ${userMessage}?`,
      `I really enjoyed ${userMessage}. Any recommendations?`,
      `What movies are like ${userMessage}?`,
    ];

    const movieTitle = extractMovieTitle(userMessage);
    const encodedTitle = encodeURIComponent(movieTitle);
    console.log(`Fetching recommendations for movie title: ${encodedTitle}`);

    try {
      const response = await axios.get(recommendationAPI, {
        params: { movie: encodedTitle },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      });

      console.log("Response from recommendation API:", response.data);

      if (
        response.data.recommended_movies_name &&
        response.data.recommended_movies_poster
      ) {
        const { recommended_movies_name } = response.data;
        const recommendations = recommended_movies_name.join(", ");

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: prompts[Math.floor(Math.random() * prompts.length)],
              },
            ],
          }),
        };

        const gptResponse = await fetch(API_URL, requestOptions).then((res) =>
          res.json()
        );
        const gptMessage = gptResponse.choices[0].message.content;

        const finalMessage = `${gptMessage} Here are some recommendations: ${recommendations}`;
        messageElement.textContent = finalMessage;
        speakText(finalMessage);
      } else {
        const errorMessage =
          "Sorry, I couldn't find any recommendations for that movie.";
        messageElement.textContent = errorMessage;
        speakText(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      const errorMessage = "Ooops! Something went wrong. Please try again.";
      messageElement.textContent = errorMessage;
      speakText(errorMessage);
    } finally {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  };

  const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  };

  sendChatBtn.addEventListener("click", handleChat);
}
