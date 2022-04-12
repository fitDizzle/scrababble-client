import React from "react";
import styled from "styled-components";

const LetterContainer = styled.div`
  transform: rotate(${(props) => (props.rotate)});

  p + div {
  float: right;
  transform-style: preserve-3d;
}
`;

const PerspectiveContainer = styled.div`
  transform: perspective(0cm) rotateX(0deg) rotateY(83.5deg);
`;

const Front = styled.div`
  margin-top: 9.5px;
  margin-right: 5px;
  margin-left: -22px;
  position: absolute;
  width: 35px;
  height: 35px;
  line-height: 28px;
  font-size: 25px;
  text-align: center;

  p {
    line-height: 0px;
  }

  p + div {
    float: right;
    transform-style: preserve-3d;
  }

  background: repeating-linear-gradient(
    205deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(218, 205, 189),
    white,
    #b17045
  );
  transform: translate3d(-10.5px, 0px, 22px);
`;

const Top = styled.div`
  margin-top: 9.5px;
  margin-right: 5px;
  margin-left: -22px;
  position: absolute;
  width: 35px;
  height: 35px;
  line-height: 28px;
  font-size: 25px;
  text-align: center;

  p {
    line-height: 0px;
  }

  p + div {
    float: right;
    transform-style: preserve-3d;
  }

  background: repeating-linear-gradient(
    225deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(238, 206, 163),
    white,
    #b17045
  );
  transform: rotateX(90deg) translate3d(28px, 0px, 19px);

`;

const Left = styled.div`
  margin-top: 9.5px;
  margin-right: 5px;
  margin-left: -22px;
  position: absolute;
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 25px;
  text-align: center;

  p {
    line-height: 0px;
  }

  p + div {
    float: right;
    transform-style: preserve-3d;
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
  transform: rotateY(-90deg) translate3d(4.75px, 0px, 29.5px);

`;

// const Right = styled.div`
//   margin-top: 9.5px;
//   margin-right: 5px;
//   margin-left: -22px;
//   position: absolute;
//   width: 35px;
//   height: 35px;
//   line-height: 28px;
//   font-size: 25px;
//   text-align: center;

//   p {
//     line-height: 0px;
//   }

//   p + div {
//     float: right;
//     transform-style: preserve-3d;
//   }
// `;

export const Letter = (props) => (
  <LetterContainer id={props.id} rotate={props.rotate} className="unselectable">
      <p></p>
    <PerspectiveContainer>
      <Front />
      <Top />
      <Left>{props.children}</Left>
    </PerspectiveContainer>
  </LetterContainer>
);

export default Letter;
