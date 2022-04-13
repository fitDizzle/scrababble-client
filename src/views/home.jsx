import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Letter } from "../components/reusableLetter/Letter";
import { FaJsSquare, FaReact } from "react-icons/fa";

export const StyledHomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  border-top: 5px solid #dddddd;
  padding: 16px 64px 0px 0px;
  overflow: hidden;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledHomeContentContainer = styled.div`
  height: 83.15vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const StyledHomePageHeader = styled.h1`
  font-size: 92px;
  color: #5f5f5f;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin: 0;
`;

export const StyledHomePageHeadLine = styled.h2`
  font-size: 52px;
  color: #464646;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0;
`;

export const StyledPlayNowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  width: 32%;
  border: 5px solid #dddd;
  padding: 7px 10px;
  background-color: #dddddd;
  font-size: 22px;
  font-weight: 900;
  color: #5f5f5f;
  box-shadow: 4px 3px 3px #afafaf;
  transition: margin-top 450ms ease-in-out;

  a {
    font-size: 12px;
    text-decoration: none;
    color: black;
  }

  :hover {
    color: #4ac2ee;
  }

  z-index: 1;
`;

export const HomePageFooter = styled.footer`
  width: 95%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px 16px 16px;
  color: #434343;
`;

const TileDisplayContainer = styled.div`
  height: 200px;
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 50px;
  z-index: 1;
`;

const MeetMavenContainer = styled.div`
  width: 975px;
  height: 75px;
  display: flex;
  text-align: center;
  /* border: 2px solid #4ac2ee; */
  border-radius: 5px;
  color: #777777;
  font-weight: 700;
  padding: 16px;
  p {
    padding-top: 25px;
    padding-left: 50px;
    font-size: 30px;
  }
`;

const MavenImg = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

const RegisterButton = styled.a`
  padding-right: 170px;
  padding-top: 20px;
  text-decoration: none;
  color: #434343;
  font-size: 25px;
  font-weight: 700;
  :hover {
    color: #4ac2ee;
  }
`;

const Home = (props) => {
  const history = useHistory();
  return (
    <StyledHomePageContainer>
      <MainContentContainer>
        <MeetMavenContainer>
          <MavenImg src="images/avatar_g2.jpg" alt="maven 2.0" />
          <p>"Think you can beat me?"</p>
        </MeetMavenContainer>
        {/* <Letter rotate={"-135deg"}>X</Letter> */}
        <StyledHomeContentContainer>
          <StyledHomePageHeader>Scrababble!</StyledHomePageHeader>
          <StyledHomePageHeadLine>
            Our take on a family classic.
          </StyledHomePageHeadLine>
          {/* <TileDisplayContainer>
            <Letter rotate={"135deg"}>B</Letter>
            <Letter rotate={"135deg"}>X</Letter>
            <Letter rotate={"60deg"}>D</Letter>
            <Letter rotate={"60deg"}>V</Letter>
            <Letter rotate={"-120deg"}>E</Letter>
            <Letter rotate={"160deg"}>C</Letter>
            <Letter rotate={"-90deg"}>L</Letter>
            <Letter rotate={"-205deg"}>L</Letter>
          </TileDisplayContainer> */}
          <StyledPlayNowButton onClick={() => history.push("/login")}>
            Play Now
          </StyledPlayNowButton>
          <RegisterButton href="/register">Register?</RegisterButton>
          {/* <Letter rotate={"-115deg"}>G</Letter>
          <Letter rotate={"15deg"}>O</Letter>
          <Letter rotate={"135deg"}>Y</Letter> */}
        </StyledHomeContentContainer>
      </MainContentContainer>
      <HomePageFooter>
        <h3>www.scrababble.com</h3>
        {/* <Letter rotate={"-205deg"}>Y</Letter>
        <Letter rotate={"15deg"}>D</Letter> */}
        <h3>
          Team DragonFly 2021 &copy; Powered by:{" "}
          <FaJsSquare color={"blue"} size={20} />
          <FaReact color={"blue"} size={20} />
        </h3>
        {/* <input type="text" onKeyPress={(e) => re(e)} />
        {keys.join("") == "jawow!" ? <Egg /> : null} */}
      </HomePageFooter>
    </StyledHomePageContainer>
  );
};

export default Home;
