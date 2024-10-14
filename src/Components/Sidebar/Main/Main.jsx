import React, { useContext } from "react";
import "./Main.css";
import { assests } from "../../../assets/assests";
import { Context } from "../../../Context/Context";

function Main() {
  const {
    previousPrompt,
    onSend,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  // Function to handle sending input
  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input); // Call onSend from context, which will update recentPrompt and previousPrompt
      setInput(""); // Clear input after sending the prompt
    }
  };

  // Handle pressing Enter to send input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assests.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Sahil</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest Code for Calculator</p>
                <img src={assests.campass_icon} alt="Calculator Icon" />
              </div>
              <div className="card">
                <p>Suggest places with adventures.</p>
                <img src={assests.bulb_icon} alt="Adventure Icon" />
              </div>
              <div className="card">
                <p>Write a funny joke for my friend</p>
                <img src={assests.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>How to optimize our code.</p>
                <img src={assests.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assests.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p> {/* Shows the recent prompt */}
            </div>
            <div className="result-data">
              <img src={assests.gemini_icon} alt="Gemini Icon" />

              {/* Show a loading animation while waiting for response */}
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            />
            <div>
              <img src={assests.gallery_icon} alt="Gallery Icon" />
              <img src={assests.mic_icon} alt="Microphone Icon" />
              <img onClick={handleSend} src={assests.send_icon} alt="Send Icon" />
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
