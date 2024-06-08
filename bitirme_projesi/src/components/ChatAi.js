import "../styling/AiStyle.css";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Aichat from "./Script";

export default function AiPage() {
  return (
    <>
      <script src="script.js" defer></script>
      <body>
        <div className="chatbot">
          <header>
            <h2>ChatBot</h2>
          </header>
          <ul className="chatbox">
            <li className="chat incoming">
              <div className="face">
                <FaceOutlinedIcon sx={{ marginTop: "4.5px" }} />
              </div>
              <p>Hi, I am ChatBot. How can i help you today</p>
            </li>

            <li className="chat outgoing"></li>
          </ul>
          <div className="chat-input">
            <textarea placeholder="Enter Message" required></textarea>
            <span className="send" onClick={Aichat}>
              <SendOutlinedIcon />
            </span>
          </div>
        </div>
      </body>
    </>
  );
}
