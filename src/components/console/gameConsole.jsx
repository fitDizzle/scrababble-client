import React from "react";

export const GameConsole = (props) => {
  return (
    <div id="game-console">
      <h1>~ Scrabble Clone ~</h1>
      <thead>
      <table>
        <td>Players</td>
        <td>Score</td>
        <td>current turn</td>
        <td>highest word</td>
        <tbody>
        <tr>John</tr>
        <tr>Mark</tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      </thead>
        <nl />
    </div>
  );
};

export default GameConsole;
