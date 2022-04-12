import React from "react";
import styled from "styled-components";
import Letter from "../reusableLetter/Letter";

const LogoLettersContainer = styled.div`
  margin-left: 2rem;
  margin-top: -0.8rem;
  width: 23.5rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;

  /* LOGO */
#logo-1 {
  transform: rotate(15deg);
}

#logo-2 {
  transform: rotate(5deg);
}

#logo-3 {
  transform: rotate(-5deg);
}

#logo-4 {
  transform: rotate(0deg);
}

#logo-5 {
  transform: rotate(10deg);
}

#logo-6 {
  transform: rotate(0deg);
}

#logo-7 {
  transform: rotate(15deg);
}

#logo-8 {
  transform: rotate(10deg);
}
`;

const LogoLetters = () => {
  function RenderLetters() {
    let letters = [["S"], ["C"], ["R"], ["A"], ["B"], ["A"], ["B"], ["B"], ["L"], ["E."]];

    return letters.map((letter, i) => {
      return (
        <Letter id={`logo-${i}`} className="unselectable" key={i}>
          {letter}
        </Letter>
      );
    });
  }
  return <LogoLettersContainer>{RenderLetters()}</LogoLettersContainer>;
};

export default LogoLetters;
