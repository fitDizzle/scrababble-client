import store from "../../../Redux/store";

export const TauntMessages = (props) => {
  const state = store.getState();
  const player = state.auth.user.username;

  const taunts = {
    PLAYER_TAKES_LEAD: {
      action: "PLAYER_TAKES_LEAD",
      messages: [
        "Noooooo!",
        "Good job, I guess.",
        "Are you kidding!?",
        "You got lucky!",
        "That won't happen again.",
      ],
    },
    AI_TAKES_LEAD: {
      action: "AI_TAKES_LEAD",
      messages: [
        "Noooooo!",
        "Good job, I guess.",
        "Are you kidding!?",
        "You got lucky!",
        "That won't happen again.",
      ],
    },
    PLAYER_SKIPPED_TURN: {
      action: "PLAYER_SKIPPED_TURN",
      messages: [
        "Cat got your tongue?",
        "You're making this too easy.",
        "Would you like some help?",
        "It's a slippery slope!",
        "Get your game up!",
      ],
    },
    AI_SKIPPED_TURN: {
      action: "AI_SKIPPED_TURN",
      messages: [
        "Let's give you a chance...",
        "Wow...That's a first.",
        "This is just great.",
        "Come on!",
      ],
    },
    PLAYER_EXCHANGED_LETTERS: {
      action: "PLAYER_EXCHANGED_LETTERS",
      messages: [
        "That bag isn't full of miracles!",
        "I hope that helped you.",
        "Give me an H, give me an A!",
        "What'd you get?! Let me see!",
      ],
    },
    AI_EXCHANGED_LETTERS: {
      action: "AI_EXCHANGED_LETTERS",
      messages: [
        "Let's see...",
        "Hopefully, you saved some vowels.",
        "I wonder.",
        "I got this game in the bag.",
      ],
    },
    PLAYER_WORD_ATTEMPT_SUCCESS: {
      action: "PLAYER_WORD_ATTEMPT_SUCCESS",
      messages: [
        "Hahaha, that's it?",
        "Nice...",
        "Well...well...well...",
        "Geez!",
        "Oh, come on!",
        "That's probably not even a word.",
        "Oh, Wow...",
        "Good...for..you..",
      ],
    },
    PLAYER_WORD_ATTEMPT_FAIL: {
      action: "PLAYER_WORD_ATTEMPT_FAIL",
      messages: [
        "Nice try. :)",
        "Hahaha!",
        "Oh, darn. My turn!",
        "Saw that coming.",
        "Is this your first time?",
      ],
    },
    AI_WORD_ATTEMPT_SUCCESS: {
      action: "AI_NEW_WORD_SUCCESS",
      messages: [
        "You jelly?",
        "Wooooooooh!",
        "I'm just warming up!",
        "And the crowd goes wild!",
      ],
    },
    AI_NEW_WORD_FAIL: {
      action: "AI_NEW_WORD_FAIL",
      messages: [
        "Awe, man!",
        "What dictionary are we using?",
        "That is definitely a word.",
        "Oh my...",
      ],
    },
    PLAYER_WIN: {
      action: "PLAYER_WIN",
      messages: [
        "Noooooo!",
        "Good job, I guess.",
        "Are you kidding!?",
        "You got lucky!",
        "That won't happen again.",
      ],
    },
    PLAYER_LOSS: {
      action: "PLAYER_LOSS",
      messages: [
        "W I N N I N G",
        "I am inevitable.",
        "You played your heart out kid.",
        "Better luck next time.",
        "That was great! Good game.",
      ],
    },
    GAME_TIE: {
      action: "TIE_GAME",
      messages: [
        "We can't end like this!",
        "I'm not good at sharing.",
        "I was supposed to win!",
        "Good game kid!",
        "Let's even this score.",
      ],
    },
    NEW_GAME_STARTED: {
      action: "NEW_GAME_LOADED",
      messages: [
        `Hi ${player}, are you ready?`,
        "Let's go!",
        "This should be fun.",
      ],
    },
    SAVED_GAME_LOADED: {
      action: "SAVED_GAME_LOADED",
      messages: [
        "I've been waiting this.",
        "Where have you been!?",
        "Finally, I can win this thing.",
        "And we're back!",
      ],
    },
    ASK_MAVEN: {
      action: "ASK_MAVEN",
      messages: [
        "I figured you'd need my help.",
        "Whose idea was this anyway?",
        "What to do, what to do.",
        "Hmmmm...",
        "Help you? No problem.",
      ],
    },
    INVALID_FIRST_PLAY: {
      action: "INVALID_FIRST_PLAY",
      messages: [
        "Oh, geez....",
        "Have you read the rules?",
        "Ding! Ding! Ding!",
        "Oops?",
      ],
    },
    INVALID_CURRENT_PLAY: {
      action: "INVALID_CURRENT_PLAY",
      messages: ["Duhh!", "That's a first.", "Oops?"],
    },
  };

  return taunts[props];
};

export default TauntMessages;