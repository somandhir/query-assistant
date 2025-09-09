import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    
    let response;
    
    try {
      // If prompt is provided (from card click), use it; otherwise use input
      if (prompt !== undefined) {
        response = await main(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await main(input);
      }
      
      // Process the response for formatting
      let responseArray = response.split("**");
      let newResponse = "";
      
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      
      let newResponse2 = newResponse.split("*").join("</br>");
      let newResponseArray = newResponse2.split(" ");
      
      // Animate the text display
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }
      
    } catch (err) {
      if (err.code === 429) {
        setResultData("Rate limit exceeded. Please wait and try again later.");
      } else {
        console.error(err);
        setResultData("Sorry, something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput, 
    setShowResult,

  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;