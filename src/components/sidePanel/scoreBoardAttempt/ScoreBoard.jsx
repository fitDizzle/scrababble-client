import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import store from '../../../Redux/store';



const ScoreBoard = (props) => {
	const state = store.getState();
	let ai = state.ai;
	let player = state.player;
	let active = state.game.playerActive
	useEffect(() => {}, );

	return (
		<ScoreBoardMain>
			{active && player.score > 0 && player.wordScore > 0 ? (
				<ScoreBoardContainer className="show">
					{/* <ScoreBoardText>{props.player}</ScoreBoardText> */}
					<ScoreBoardText>+ {player.wordScore}</ScoreBoardText>
				</ScoreBoardContainer>
			) : null}
		</ScoreBoardMain>
	);
};

export default ScoreBoard;
const ScoreBoardMain = styled.div`
	.show {
		visibility: visible;
    -webkit-animation: fadein 1.5s;
    -webkit-animation-name: fadein 1.5s;
    animation-name: fadein 3.5s;
    /* -webkit-animation-iteration-count: infinite; */
    /* animation-iteration-count: infinite; */
    animation-direction: forwards;
    animation-fill-mode: forwards;
    border-radius: 2px;
    padding: 16px;
    position: absolute;
    top: 15%;
    right: 7%;
	}
`;
const ScoreBoardContainer = styled.div`
	visibility: hidden;
	min-width: 250px;
	margin-left: -125px;
	background-color: transparent;
	color: #9dff00;
	text-align: center;

	@-webkit-keyframes fadein {
		0% {
			opacity: 1;
			z-index: 10;
			color: #09ff09;
		}
		80%{
			color: #09ff09;
			opacity: 1;
			font-weight: 700;
		}
		100% {
			top: 10%;
			opacity:0;
			color: #09ff09;
			font-weight: bolder;
			font-size:1.8em;
			/* opacity: 0;
			z-index: -10; */
		}
	}

	@keyframes fadein {
		0% {
			opacity: 1;
			z-index: 10;
			color: #09ff09;
		}
		90%{
			color: #09ff09;
			opacity: 1;
			font-weight: 700;
			font-size:2em;

		}
		100% {
			top: 10%;
			opacity:0;
			color: #09ff09;
			font-weight: bolder;
			font-size:2em;
			/* opacity: 0;
			z-index: -10; */
		}
	}
`;
const ScoreBoardText = styled.p`
	text-align: center;
`;