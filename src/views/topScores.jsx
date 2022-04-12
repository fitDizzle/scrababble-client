import React, { useState, useEffect } from "react";
import Letter from "../components/reusableLetter/Letter";

const TopScores = () => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    setTopScores([
      ["JOHN MAZURI", 10325],
      ["Mark Clarkus", 23221],
      ["Mark Clarkus", 23221],
      ["Mark Clarkus", 23221],
      ["Mark Clarkus", 23221],
    ]);
    return (error) => {
      if (error) {
        console.log(error);
      }
    };
  }, [topScores]);

  return (
    <div>
      <h1>
        <Letter>T</Letter>
        <Letter>O</Letter>
        <Letter>P</Letter>
        <Letter>{" "}</Letter>
        <Letter>S</Letter>
        <Letter>C</Letter>
        <Letter>O</Letter>
        <Letter>R</Letter>
        <Letter>E</Letter>
        <Letter>S.</Letter>
      </h1>
      {topScores.map((score, idx) => {
        return (
          <span key={idx}>{idx}.
            <h3>{score[0]}</h3>
            <h3>{score[1]}</h3>
          </span>
        );
      })}
    </div>
  );
};

export default TopScores;
