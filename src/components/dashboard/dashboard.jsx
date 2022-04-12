import React, { useState, useEffect } from "react";
import * as Styles from "./styles/dashboardStyles";

import { HiX } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { initialSetupAction } from "../../Redux/actions/gameplayActions/initialSetup";

import { loadActiveGameAction } from "../../Redux/actions/loadActions/loadGames";
import { deleteGameAction } from "../../Redux/actions/savedGameActions/deleteGame";
import { fetchAllGames } from "./functions/fetchGames";


export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { level: aiLevel } = useSelector((state) => state.ai);
  let [games, setGames] = useState(null);

  // const { name, username, wins, losses } = useSelector((state) => state.auth.user);


  let [gameId, setGameId] = useState(null);

  const [level, setLevel] = useState("MAVIN");

  useEffect(() => {
    const fetchGames = async () => {
      let res = await fetchAllGames(JSON.parse(localStorage.getItem("token")));
      setGames(res);
    };
    fetchGames();
  }, []);


  const changeLevel = (e) => {
    setLevel("MAVIN")
  };



  const submitAndPlay = () => {
    let username = state.auth.user.username;

    let infoToPass = {
      level,
      username,
    };
    dispatch(initialSetupAction(infoToPass, history));
  };

  const loadGame = async () => {
    if (gameId) {
      await dispatch(loadActiveGameAction(gameId, history, JSON.parse(localStorage.getItem("token"))));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const continueGame = () => {
    if (aiLevel !== "") {
      history.push("/scrababble");
      return;
    }
    window.alert("No active game");
    return;
  };

  const deleteGame = async (e) => {
    let selectedGame = e.target.id;
    if (selectedGame && selectedGame.length) {
      await dispatch(deleteGameAction(selectedGame, JSON.parse(localStorage.getItem("token"))));
      let updatedGames = games.filter((game) => game.id != selectedGame);
      setGames(updatedGames);
    }
  };

  return (
    <Styles.DashBoardContainer>
      <Styles.DashBoardContentContainer>
        <Styles.DashBoardHeader>
          <h1>Welcome, {state.auth.user.username}!</h1>
          <a onClick={logout}>Logout</a>
        </Styles.DashBoardHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: "75%",
            alignItems: "center",
          }}
        >
          <Styles.PlayerInformationContainer>
            <h2>User Information</h2>
            <Styles.PlayerInformation>
              <p>
                <strong>Ranking: </strong> MADSCRABBLER
              </p>
              <p>
                {" "}
                <strong>Name: </strong> {state.auth.user.name}
              </p>
              <p>
                {" "}
                <strong>Username: </strong> {state.auth.user.username}
              </p>
              <p>
                {" "}
                <strong>Email: </strong> mazuri@visitMissouri.com
              </p>
              <p>
                {" "}
                <strong>Wins: </strong> 71
              </p>
              <p>
                {" "}
                <strong>Losses: </strong> 13
              </p>
              <a href="/update">Update Account Information?</a>
            </Styles.PlayerInformation>
          </Styles.PlayerInformationContainer>

          <Styles.GamesHistory>
            <h2>Game History</h2>
            <Styles.GamesHistoryHeaderContent>
              <p>Date</p>
              <p>Difficulty</p>
              <p>Result</p>
              <p>Score</p>
            </Styles.GamesHistoryHeaderContent>

            <Styles.GamesHistoryContainer>
              {games &&
                games.map((game) => {
                  return (
                    <Styles.GameCard id={`game${game.id}`} onClick={() => setGameId(game.id)} key={game.id}>
                      <p>{game.date}</p>
                      <p>{game.level}</p>
                      <p>{"Active"}</p>
                      <p>{`${game.playerScore} Points`}</p>
                      <HiX
                        id={game.id}
                        size={20}
                        onDoubleClick={(e) => deleteGame(e)}
                      />
                    </Styles.GameCard>
                  );
                })}
            </Styles.GamesHistoryContainer>
          </Styles.GamesHistory>
        </div>

        <Styles.DashBoardButtonContainer>
          <Styles.GamePlayForm>
            <label>
              <strong>Select Difficulty: </strong>
            </label>
            <Styles.GamePlayFormSelect type="select">
              <option onClick={changeLevel} value="DERP">
                DERP
              </option>
              <option onClick={changeLevel} value="Suzy Spells">
                SUZY SPELLS
              </option>
              <option onClick={changeLevel} value="MAVIN 2.0">
                MAVIN 2.0
              </option>
            </Styles.GamePlayFormSelect>
          </Styles.GamePlayForm>

          <Styles.DashBoardButton onClick={submitAndPlay}>
            Start Game
          </Styles.DashBoardButton>
          <Styles.DashBoardLoadButton onClick={loadGame} gameId={gameId} isLoad={true}>
            Load Game
          </Styles.DashBoardLoadButton>
          <Styles.DashBoardButton onClick={continueGame}>
            Continue Game
          </Styles.DashBoardButton>
        </Styles.DashBoardButtonContainer>
      </Styles.DashBoardContentContainer>
    </Styles.DashBoardContainer>
  );
}
