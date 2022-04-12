import { GamePlayMessages } from "../../components/messages/gameFeed/game-play-messages";
import { TauntMessages } from "../../components/messages/ai/taunt-messages";
import store from "../../Redux/store";

export const useGetMessages = async (type) => {
  const { dispatch } = store
  const messageState = await store.getState().messages;
  const randomMessageIndex = Math.floor(Math.random() * TauntMessages(type).messages.length);

  const genGameFeedMessageId = messageState.gameFeedMessages.length + 1;
  const genAiMessageId = messageState.aiMessages.length + 1;

  try {
    const aiMessage = {
      id: genAiMessageId,
      taunt: TauntMessages(type).messages[randomMessageIndex],
    };

    const gameMsg = await GamePlayMessages(type);

    const gameFeedMessage = {
      id: genGameFeedMessageId,
      message: gameMsg,
    };

    console.log({
      game: gameFeedMessage,
      ai: aiMessage
    }, "payload dispatching in message hook")

    await dispatch({
      type: "NEW_GAME_MESSAGE",
      payload: {
        game: gameFeedMessage,
        ai: aiMessage
      }
    });

  } catch (error) {
    return "Error sending game play messages.";
  }
  return;
};

export default useGetMessages;
