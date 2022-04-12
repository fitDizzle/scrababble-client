import tauntMessages from "../components/messages/ai/taunt-messages";
import gamePlayMessages from "../components/messages/gameFeed/game-play-messages";

export const useGetMessages = (type) => {
  console.log(tauntMessages, "TAUNT MESSAGES FROM HOOK");
  console.log(gamePlayMessages, "GAME PLAY MESSAGES MESSAGES FROM HOOK");
  console.log(gamePlayMessages[0], 'CHECK THIS TYPE');

  if(type === ''){

  } else if(type === ''){

  } else if(type === ''){
    
  } else if(type === ''){
    
  } else if(type === ''){
    
  } else if(type === ''){
    
  } else if(type === ''){
    
  } else {
    return 
  }
  return { gameFeedMessage : gamePlayMessages[0].message };
};

export default useGetMessages;
