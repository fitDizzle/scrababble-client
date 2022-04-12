import React, { useEffect, useState } from "react";
import * as Styles from "./styles/gamePlayMessages";
import { useSelector } from "react-redux";

export const GamePlayMessage = () => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const { gameFeedMessages } = useSelector((state) => state.messages);

  const renderMessages = (messages) => {
    return messages.sort((a,b) => a.id - b.id).reverse().map((msg, i) => {
      return (
        <Styles.GameMessage
          key={i}
          type={msg.message.type}
          message={msg.message.message}
        >
          {msg.message.message}
        </Styles.GameMessage>
      );
    });
  };

  useEffect(() => {
    console.log(currentMessages, "CURRENT MESSAGES");
  }, [currentMessages]);

  useEffect(() => {
    const setMessages = async () => {
      setCurrentMessages(gameFeedMessages);
    };
    setMessages();
  }, [gameFeedMessages]);

  return (
    <Styles.StyledGamePlayMessageContainer>
      <div>{renderMessages(currentMessages)}</div>
    </Styles.StyledGamePlayMessageContainer>
  );
};

export default GamePlayMessage;
