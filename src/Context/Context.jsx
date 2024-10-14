import { createContext, useState, useEffect } from "react";
import run from "../Config/Gemini";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 40 * index);
  };

  const onSend = async (prompt) => {
    // Clear the result data and prepare to show the result
    setResultData("");
    setLoading(true);
    setShowResult(true);

    // Single state update to avoid multiple renders
    setPreviousPrompt((prev) => {
      // Add input to previousPrompt only if it's not a duplicate
      return !prev.includes(input) ? [...prev, input] : prev;
    });

    // Set the recent prompt separately to avoid double renders
    setRecentPrompt(input);

    // Call the API
    const response = await run(prompt);

    // Process the response
    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        // Add a line break before the <b> tag to ensure it starts on a new line
        newResponse += "<br /><b>" + responseArray[i] + "</b>";
      }
    }

    // Replace * with <br/>
    let newResponse2 = newResponse.split("*").join("<br/>");

    // Split by words for typing effect
    let newResponseArray = newResponse2.split(" ");

    // Display response with typing effect
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    // Reset loading state and clear input
    setLoading(false);
    setInput(""); // Clear input after sending the prompt
  };

  // Debugging useEffect to monitor changes in previousPrompt (remove later)
  useEffect(() => {
    console.log("Previous Prompt:", previousPrompt);
  }, [previousPrompt]);

  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
export { Context };
