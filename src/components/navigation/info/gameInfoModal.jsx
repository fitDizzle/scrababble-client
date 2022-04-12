import React, { useRef } from "react";
import Modal from "../../CustomComponents/Modal";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 92px;
  color: #5f5f5f;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin: 0;
`;

const StartingTileCountContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow-wrap: break-word;
`;

const ScoringRulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GamePlayRulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: white;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  height: 40rem;
  margin-top: -24rem;
  padding-right: 64px;
  padding-left: 64px;
  padding-bottom: 64px;
  h3 {
    color: #484848;
  }
`;

const TileCountsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 10px;
`;

const TileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(204, 204, 204, 0.453);
  border-radius: 10px;
  padding: 6px;
  margin: 0;
  margin-left: 2px;
  margin-bottom: 2px;
`;

const tiles = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 2,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
  Blank: 2,
};

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const AboutSubTitle = styled.h3`
  color: #5f5f5f;
  padding-bottom: 10px;
`;

const AboutImg = styled.img`
  width: 100%;
  height: auto;
`;

const AboutList = styled.ul`
  list-style: none;
  margin: 0;
`;

const GameInfoModal = () => {
  const tileLetters = Object.keys(tiles);
  const tileCounts = Object.values(tiles);

  const tileCount = Object.values(tiles).reduce(
    (total, current) => total + current,
    0
  );

  function renderTileCount() {
    return tileLetters.map((_, i) => (
      <TileContainer key={i}>
        {tileLetters[i].toLocaleUpperCase() + " " + tileCounts[i]}
      </TileContainer>
    ));
  }

  const infoModalRef = useRef();

  return (
    <div>
      <button onClick={() => infoModalRef.current.openModal()}>Info</button>
      <Modal ref={infoModalRef}>
        <InfoContainer>
          <GamePlayRulesContainer>
            <Title>Rules.</Title>
            <ol>
              <li key={0}>
                The first player combines two or more of his or her letters to
                form a word and places it on the board to read either across or
                down with one letter on the center square. Diagonal words are
                not allowed.
              </li>
              <br />
              <li key={1}>
                Complete your turn by counting and announcing your score for
                that turn. Then draw as many new letters as you played; always
                keep seven letters on your rack, as long as there are enough
                tiles left in the bag.
              </li>

              <br />
              <li key={2}>
                Play passes to the left. The second player, and then each in
                turn, adds one or more letters to those already played to form
                new words. All letters played on a turn must be placed in one
                row across or down the board, to form at least one complete
                word. If, at the same time, they touch others letters in
                adjacent rows, those must also form complete words, crossword
                fashion, with all such letters. The player gets full credit for
                all words formed or modified on his or her turn.
              </li>

              <br />
              <li key={3}>
                New words may be formed by: Adding one or more letters to a word
                or letters already on the board. Placing a word at right angles
                to a word already on the board. The new word must use one of the
                letters already on the board or must add a letter to it. (See
                Turns 2, 3 and 4 below.) Placing a complete word parallel to a
                word already played so that adjacent letters also form complete
                words. (See Turn 5 in the Scoring Examples section below.)
              </li>
              <br />

              <li key={4}>
                No tile may be shifted or replaced after it has been played and
                scored.
              </li>
              <br />
              <li key={5}>
                Blanks: The two blank tiles may be used as any letters. When
                playing a blank, you must state which letter it represents. It
                remains that letter for the rest of the game.
              </li>
              <br />
              <li key={0}>
                You may use a turn to exchange all, some, or none of the
                letters. To do this, place your discarded letter(s) facedown.
                Draw the same number of letters from the pool, then mix your
                discarded letter(s) into the pool. This ends your turn.
              </li>
              <br />
              <li key={6}>
                Any play may be challenged before the next player starts a turn.
                If the play challenged is unacceptable, the challenged player
                takes back his or her tiles and loses that turn. If the play
                challenged is acceptable, the challenger loses his or her next
                turn. Consult the dictionary for challenges only. All words made
                in one play are challenged simultaneously. If any word is
                unacceptable, then the entire play is unacceptable. Only one
                turn is lost on any challenge.
              </li>
              <br />
              <li key={7}>
                The game ends when all letters have been drawn and one player
                uses his or her last letter; or when all possible plays have
                been made.
              </li>
            </ol>
          </GamePlayRulesContainer>
          <ScoringRulesContainer>
            <Title>Scoring.</Title>
            <ol>
              <li key={8}>
                Use a score pad or piece of paper to keep a tally of each
                player's score, entering it after each turn. The score value of
                each letter is indicated by a number at the bottom of the tile.
                The score value of a blank is zero.
              </li>
              <br />
              <li key={9}>
                The score for each turn is the sum of the letter values in each
                word(s) formed or modified on that turn, plus the additional
                points obtained from placing letters on Premium Squares.
              </li>
              <br />
              <li key={10}>
                Premium Letter Squares: A light blue square doubles the score of
                a letter placed on it; a dark blue square triples the letter
                score.
              </li>
              <br />

              <li key={11}>
                Premium Word Squares: The score for an entire word is doubled
                when one of its letters is placed on a pink square: it is
                tripled when one of its letters is placed on a red square.
                Include premiums for double or triple letter values, if any,
                before doubling or tripling the word score. If a word is formed
                that covers two premium word squares, the score is doubled and
                then re-doubled (4 times the letter count), or tripled and then
                re-tripled (9 times the letter count). NOTE: the center square
                is a pink square, which doubles the score for the first word.
              </li>
              <br />

              <li key={12}>
                Letter and word premiums count only on the turn in which they
                are played. On later turns, letters already played on premium
                squares count at face value. 6. When a blank tile is played on a
                pink or red square, the value of the word is doubled or tripled,
                even though the blank itself has no score value.
              </li>
              <br />
              <li key={13}>
                When two or more words are formed in the same play, each is
                scored. The common letter is counted (with full premium value,
                if any) for each word. (See Turns 3, 4 and 5 in the Scoring
                Examples section.)
              </li>
              <br />
              {/* <li key={0}>
                BINGO! If you play seven tiles on a turn, it's a Bingo. You
                score a premium of 50 points after totaling your score for the
                turn. 9. Unplayed Letters: When the game ends, each player's
                score is reduced by the sum of his or her unplayed letters. In
                addition, if a player has used all of his or her letters, the
                sum of the other players' unplayed letters is added to that
                player's score. 10. The player with the highest final score wins
                the game. In case of a tie, the player with the highest score
                before adding or deducting unplayed letters wins.
              </li>
              <br /> */}
            </ol>
          </ScoringRulesContainer>

          <StartingTileCountContainer>
            <Title>Tiles.</Title>
            <TileCountsContainer>{renderTileCount()}</TileCountsContainer>
            <h3>Total Tiles: {tileCount}</h3>
          </StartingTileCountContainer>

          <AboutContainer>
            <Title>About.</Title>
            <AboutSubTitle>
              This application was inspired by a single algorithm.(source:
              www.edabit.com)
            </AboutSubTitle>
            <AboutImg
              src="./images/scrabble_algo.png"
              alt="scrabble-algorithm"
            />

            <AboutSubTitle>Technologies Used</AboutSubTitle>
            <AboutList>
              <li key={14}>
                <strong>MariaDB (SQL)</strong>
              </li>
              <li key={15}>
                <strong>Express</strong>
              </li>
              <li key={16}>
                <strong>React</strong>
              </li>
              <li key={17}>
                <strong>Node.js</strong>
              </li>
            </AboutList>

            <AboutSubTitle>Additional Libraries</AboutSubTitle>
            <AboutList>
              <li key={18}><strong>Sequelize-cli</strong></li>
              <li key={19}><strong>Styled-Components</strong></li>
              <li key={20}><strong>React-icons</strong></li>
            </AboutList>
            <AboutSubTitle>About The Developers</AboutSubTitle>
            <AboutList>
              <li key={21}>
                <strong>
                  Mark Clark (UI/UX, Game Play, Application Architecture)
                </strong>
              </li>
              <li key={22}>
                <strong>
                  John Mazur IV (AI Development, Game Play, Server Engineer){" "}
                </strong>
              </li>
            </AboutList>

            <AboutSubTitle>Additional Contributors</AboutSubTitle>
            <AboutList>
              <li key={23}>
                <strong>Bill Hooker (Theme, UI/UX) </strong>
              </li>
              <li key={24}>
                <strong>Garth Jaramillo (Bag Man) </strong>
              </li>
            </AboutList>
          </AboutContainer>
        </InfoContainer>
      </Modal>
    </div>
  );
};

export default GameInfoModal;
