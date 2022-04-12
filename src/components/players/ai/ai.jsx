import React, { useEffect, useState } from "react";
import PlayerAvatar from "../style/playerAvatar";
import { useSelector } from "react-redux"

const AI_Player = () => {

  const { ai } = useSelector(state => state)

  const { isPlayerActive } = useSelector(state => state.plays)
  const [player, setPlayer] = useState({
    playerId: "",
    playerName: "",
    playerAvatar: "",
    playerHistory: "",
    playerLevel: "",
    active: false,
  });

  useEffect(() => {
    try {
      setPlayer({
        playerId: "092384-32456098-235098",
        playerName: "Maven 2.0",
        playerAvatar: "../../images/avatar_g2.jpg",
        playerHistory: "Games Played Data",
        playerLevel: "GODZILLA",
        active: true,
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <PlayerAvatar
      name={player.playerName}
      image={player.playerAvatar}
      active={isPlayerActive}
      level={player.playerLevel}
    />
  );
};

export default AI_Player;
