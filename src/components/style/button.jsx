import React, { useState } from "react";
import styled from "styled-components";

const Button = () => {
  const [state, setState] = useState({
    active1: false,
    active2: false,
  });

  const StyledButton = styled.button`
    min-width: 200px;
    border: none;
    font-size: 18px;
    padding: 7px 10px;
    background-color: ${(props) => (props.bg === true ? "green" : "lightBlue")};
  `;

  return (
    <>
      <StyledButton
        type="submit"
        bg={state.active1}
        onClick={(e) => setState({ ...state, active1: !state.active1 })}
      >
        {state.active1 ? "active" : "inactive"}
      </StyledButton>

      <StyledButton
        type="submit"
        bg={state.active2}
        onClick={(e) => setState({ ...state, active2: !state.active2 })}
      >
        {state.active2 ? "active" : "inactive"}
      </StyledButton>
    </>
  );
};

export default Button;
