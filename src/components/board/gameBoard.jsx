import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import Block from "../blocks/block";
import BlankDropdown from "../CustomComponents/BlankDropdown";

import styled from "styled-components";

import {
  useDragoverHandler,
  useDropHandler,
} from "../../hooks/tileHooks";

import { useSelector, useDispatch } from "react-redux";

import Letter from "../letters/letter";

import { updateCurrentPlayAction } from "../../Redux/actions/gameplayActions/gameplayActions";

import {
  aiDrawAction,
  aiPlayTileAction,
} from "../../Redux/actions/aiActions/makePlay";

import { buildBlocksArray } from "./functions/gameBoard_functions";

import { useAiBuildPlays } from "../../hooks/AI/aiBuildPlays";

import EndGameModal from "../modals/endGameModal";
import WinGameModal from "../modals/winGameModal";

const StyledLetterPoints = styled.p`
  margin-left: 23px;
  margin-top: 0px;
  position: relative;
  font-size: 9px;
`;

export const GameBoard = () => {
  const tileRef = useRef();
  const dropdownRef = useRef();

  const dispatch = useDispatch();
  const { plays } = useSelector((state) => state);
  const state = useSelector((state) => state);
  const { tiles } = state;
  const { playerActive } = state.game;

  const [currentMoves, setCurrentMoves] = useState([]);

  const [coordinates, setCoordinates] = useState([0, 0]);
  const [blankValue, setBlankValue] = useState(null);

  useEffect(() => {
    setCurrentMoves(plays.current);
  }, [plays]);

  const AI_PLAY = async (moves) => {
    let res = await useAiBuildPlays(moves, state.ai.tiles, state.ai.level);
    console.log(res, "res from refactored");

    if (res) {
      let tilesToSend = [...state.ai.tiles];
      await dispatch(aiPlayTileAction(res, state.ai, tiles, tilesToSend));
    } else {
      console.log("RESULT is NULL, AI DRAWING!!!!!!!!!");
      await dispatch(aiDrawAction(state.ai, tiles));
    }
  };

  useEffect(() => {
    const startAIPlay = async () => {
      if (playerActive === false) {
        console.log("AI_PLAY STARTED");
        await AI_PLAY([...plays.current, ...plays.lockedIn]);
      }
    };
    startAIPlay();
  }, [playerActive]);

  function Dragover_Handler(e) {
    useDragoverHandler(e);
  }

  async function Open_Blank_Dropdown(blank_move, x, y) {
    await setCoordinates([x, y]);
    dropdownRef.current.openDrop();

    return;
  }

  useEffect(() => {
    const resetBlank = async () => {
      if (blankValue !== null) {
        let move = {
          ...currentMoves[currentMoves.length - 1],
          tile: blankValue.toLowerCase(),
        };
        await dispatch(
          updateCurrentPlayAction(
            move,
            plays.current,
            "add",
            state.player.tiles
          )
        );
        setBlankValue(null);
      }
    };
    resetBlank();
  }, [blankValue]);

  async function Drop_Handler(e) {
    let move = await useDropHandler(e);

    if (move.tile === "blank") {
      await Open_Blank_Dropdown(move, e.clientX, e.clientY);
    }
    if (!move) {
      tileRef.current.flatten();
      return;
    }
    await dispatch(
      updateCurrentPlayAction(move, plays.current, "add", state.player.tiles)
    );
  }

  function renderBoard() {
    // let newBlocks = buildBlocksArray()
    return buildBlocksArray().map((block, i) => {
      let foundChild = [...plays.current, ...plays.lockedIn].filter(
        (play) => play.parentX == block.x && play.parentY == block.y
      );

      return (
        <Block
          x={block.x}
          y={block.y}
          className={`${block.color == "clear" ? "" : block.color} block`}
          onDrop={(e) => Drop_Handler(e)}
          onDragOver={(e) => Dragover_Handler(e)}
          value={block.value}
          key={i++}
          runCheck={foundChild.length !== 0 ? true : false}
        >
          {foundChild.length === 1 && (
            <Letter
              id={foundChild[0].id}
              value={foundChild[0].tile}
              onBoard={true}
              ref={tileRef}
              tileState={foundChild[0].tileState}
              key={foundChild[0].id}
            >
              {foundChild[0].letter
                ? foundChild[0].letter.toUpperCase()
                : foundChild[0].tile.toUpperCase()}
              <StyledLetterPoints className="unselectable">
                {foundChild[0].value}
              </StyledLetterPoints>
            </Letter>
          )}
        </Block>
      );
    });

    // -----------------------------------------------------------------------------
  }
  return (
    <div id="scrabble-board">
      <EndGameModal />
      <WinGameModal />
      <div className="game-board">{renderBoard()}</div>
      <BlankDropdown ref={dropdownRef} coordinates={coordinates}>
        <div className="blank-dropdown-wrapper">
          Please Choose A Letter
          <div className="blank-value-btns-wrapper">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, idx) => {
              return (
                <button
                  key={idx}
                  onClick={async () => {
                    await setBlankValue(letter.toLowerCase());
                    dropdownRef.current.closeDrop();
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </BlankDropdown>
    </div>
  );
};

export default GameBoard;
