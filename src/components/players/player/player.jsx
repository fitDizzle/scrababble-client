import React, { useEffect, useState } from "react";
import PlayerAvatar from "../style/playerAvatar";

import { useSelector } from "react-redux";

const Player = () => {
  const { player } = useSelector((state) => state);
  const { playerActive } = useSelector((state) => state.game);

  const [localPlayer, setPlayer] = useState({
    playerId: "",
    playerName: "",
    playerAvatar: "../../images/avatar_g2.jp",
    playerHistory: "",
    playerLevel: "Master-Scrabbler",
    active: false,
  });

  useEffect(() => {
    try {
      setPlayer({
        playerId: "092384-32456098-235098",
        playerName: "John Mazuri",
        playerAvatar: "../../images/avatar_g2.jpg",
        playerHistory: "Games Played Data",
        playerLevel: "Master-Scrabbler",
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
      key={player.playerId}
      name={player.username}
      image={localPlayer.playerAvatar}
      active={playerActive}
      level={localPlayer.playerLevel}
    />
  );
};

export default Player;
