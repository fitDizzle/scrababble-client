import React, { useState, useEffect } from "react";
import TauntToast from "./tauntToast";
import { useSelector } from "react-redux";

export const AiMessage = (props) => {
  const { aiMessages } = useSelector((state) => state.messages);
  const [aiMessage, setAiMessage] = useState([{ taunt: "" }]);

  useEffect(() => {
    if(aiMessages.length > 0){
      setAiMessage(aiMessages[0])
    }
  }, [aiMessages]);
  return aiMessage.taunt !== undefined ? (
    <TauntToast message={aiMessage.taunt}>{props.message}</TauntToast>
  ) : null;
};

export default AiMessage;
