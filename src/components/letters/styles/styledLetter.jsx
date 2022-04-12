import React from "react";
import styled from "styled-components";

const LetterContainer = styled.div`
  width: ${(props) => (props.props ? "60px" : "55px")};
  height: ${(props) => (props.draggable ? "" : "100%")};
  `;

const PerspectiveContainer = styled.div`
height: ${(props) => (props.draggable ? "" : "100%")};
  width: ${(props) => !props.draggable ? "81%" : ''};
  transform: ${(props) =>
    !props.draggable ? "rotateY(0deg)" : "rotateY(30deg)"};
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  margin-left: -3px;
  width: 7px;
  height: 38.15px;
  float: right;
  transform: rotateY(40deg);
  background: repeating-linear-gradient(
    -200deg,
    rgb(206, 159, 98),
    rgb(201, 187, 171),
    /* #e2dbdb, */ #b17045,
    #b17045
  );
  border: 1px solid rgb(150, 115, 98);
  border-top-right-radius: 2px;
`;

const Front = styled.div`
  position: relative;
  width: 65px;
  height: 37px;
  font-size: 25px;
  font-weight: 700;
  padding-top: ${(props) => props.props === true ? "4px" : "6px"};
  padding-bottom: ${(props) => props.props === true ? "0px" : "2px"};
  text-align: center;
  text-shadow: 0px 0px 4px white;
  p {
    line-height: ${(props) => (props.props ? "15px" : "0px")};
    font-weight: bold;
    text-shadow: 0px 0px 2px white;
  }
  color: #000000;
  background: repeating-linear-gradient(
    225deg,
    rgb(233, 189, 130),
    #b17045,
    rgb(230, 190, 137),
    rgb(240, 226, 207),
    #b17045
  );
`;

const StyledLetter = (props) => (
  <LetterContainer className="letter unselectable" {...props}>
    <PerspectiveContainer
      {...props}
      draggable={props.draggable}
      id={props.id}
      onDragStart={(e) => props.onDragStart(e)}
      onDragEnd={(e) => props.onDragEnd(e)}
      onDoubleClick={(e) => props.onDoubleClick(e)}
      status={props.status}
      value={props.value}
    >
      <Front className="unselectable" props={props.draggable} onClick={(e) => console.log(props,'tile props')}>
        {props.children}
      </Front>
      {props.draggable ? <Right props={props.draggable} /> : null}
    </PerspectiveContainer>
  </LetterContainer>
);

export default StyledLetter;
