import React, { useState, useSelector, useEffect } from 'react';
import styled from 'styled-components';
import store from '../../../Redux/store';
import ScoreBoard from '../scoreBoardAttempt/ScoreBoard';

const GameStatsContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: row;
	border: 2px solid #ccc;
	border-radius: 5px;
	justify-content: space-evenly;
	align-items: center;
	padding: 0.5em;
	margin-bottom: 8px;
`;

const GameStats = (props) => {
	const state = store.getState();
	let aiPlayer = state.ai;
	let player = state.player;
	return (
		<GameStatsContainer>
			<ScoreBoard player="player" />
			<StyledPlayers>
				<div>
					<h3>Player</h3>
				</div>
				<div>
					<p>{player.username}</p>
				</div>
				<div>
					<p>{aiPlayer.level ? aiPlayer.level : 'Mavin 2.0'}</p>
				</div>
			</StyledPlayers>
			<StyledScores player={player}>
				<div>
					<h3>Score</h3>
				</div>

				<div
					style={
						player.score > aiPlayer.score || player.score === 0
							? { color: 'black' }
							: { color: 'red' }
					}
				>
					<p>{player.score}</p>
				</div>

				<div
					style={
						player.score < aiPlayer.score || aiPlayer.score === 0
							? { color: 'black' }
							: { color: 'red' }
					}
				>
					<p>{aiPlayer.score}</p>
				</div>
			</StyledScores>
			<StyledHighestWord>
				<div>
					<h3>Highest Word</h3>
				</div>
				<div>
					<p>
						{player.highestWordScore.word
							? player.highestWordScore.word.toUpperCase()
							: 'No word'}
					</p>
				</div>
				<div>
					<p>
						{aiPlayer.highestWordScore.word
							? aiPlayer.highestWordScore.word.toUpperCase()
							: 'No word'}
					</p>
				</div>
			</StyledHighestWord>
		</GameStatsContainer>
	);
};

export default GameStats;

const StyledPlayers = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-evenly;
	height: 100%;
	padding: 0.2em;
	p {
		font-weight: 700;
	}
`;
const StyledScores = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 100%;
	padding: 0.2em;
	p {
		font-weight: 700;
	}
`;

const StyledHighestWord = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-evenly;
	height: 100%;
	padding: 0.2em;
	p {
		font-weight: 700;
	}
`;
