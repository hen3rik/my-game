import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { book, build, colorFill, grid } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./Tab1.css";

const Tab1 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GameGenerator></GameGenerator>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

const GameStatus = {
  NEW: "NEW",
  CHALLENGE: "CHALLENGE",
  PLAYING: "PLAYING",
  WON: "WON",
  LOST: "LOST"
};

const useGameId = () => {
  const [gameId, setGameId] = useState(1);
  return {
    gameId,
    isNewGame: gameId === 1,
    renewGame: () => setGameId(gameId => gameId + 1)
  };
};

const GameGenerator = () => {
  const { gameId, isNewGame, renewGame } = useGameId();
  const gridSize = 5;
  const challengeSize = 6;
  const cellIds = utils.createArray(gridSize * gridSize);
  const challengeCellIds = utils.sampleArray(cellIds, challengeSize);

  return (
    <GameSession
      key={gameId}
      cellIds={cellIds}
      challengeCellIds={challengeCellIds}
      gridSize={gridSize}
      challengeSize={challengeSize}
      challengeSeconds={3}
      playSeconds={10}
      maxWrongAttempts={3}
      resetGame={renewGame}
      autoStart={!isNewGame}
    />
  );
};

const GameSession = ({
  cellIds,
  challengeCellIds,
  gridSize,
  challengeSeconds,
  playSeconds,
  maxWrongAttempts,
  challengeSize,
  resetGame,
  autoStart
}) => {
  const [gameStatus, setGameStatus] = useState(
    autoStart ? GameStatus.CHALLENGE : GameStatus.NEW
  );
  const [pickedCellIds, setPickedCellIds] = useState([]);
  const [countdown, setCountdown] = useState(playSeconds);
  const pickCell = id => {
    if (gameStatus === GameStatus.PLAYING) {
      setPickedCellIds(pickedCellIds => {
        if (pickedCellIds.includes(id)) {
          return pickedCellIds;
        }
        return [...pickedCellIds, id];
      });
    }
  };
  useEffect(() => {
    const [correctPicks, wrongPicks] = utils.arrayCrossCounts(
      pickedCellIds,
      challengeCellIds
    );
    if (correctPicks === challengeSize) {
      setGameStatus(GameStatus.WON);
    }
    if (wrongPicks === maxWrongAttempts) {
      setGameStatus(GameStatus.LOST);
    }
  }, [pickedCellIds]);

  useEffect(() => {
    let timerId;
    if (gameStatus === GameStatus.PLAYING) {
      timerId = setInterval(() => {
        setCountdown(countdown => {
          if (countdown === 1) {
            clearTimeout(timerId);
            setGameStatus(GameStatus.LOST);
          }
          return countdown - 1;
        });
      }, 1000);
    }
    if (gameStatus === GameStatus.CHALLENGE) {
      timerId = setTimeout(
        () => setGameStatus(GameStatus.PLAYING),
        1000 * challengeSeconds
      );
    }
    return () => clearTimeout(timerId);
  }, [gameStatus, challengeSeconds]);

  return (
    <div className="game">
      <div className="grid">
        {cellIds.map(id => (
          <Cell
            key={id}
            gridSize={gridSize}
            gameStatus={gameStatus}
            isChallenge={challengeCellIds.includes(id)}
            isPicked={pickedCellIds.includes(id)}
            onClick={() => pickCell(id)}
          />
        ))}
      </div>
      <Footer
        startGame={() => setGameStatus(GameStatus.CHALLENGE)}
        countdown={countdown}
        gameStatus={gameStatus}
        resetGame={resetGame}
      />
    </div>
  );
};

const CellStatus = {
  NORMAL: "white",
  HIGHLIGHT: "lightblue",
  CORRECT: "lightgreen",
  WRONG: "pink"
};
const Cell = ({
  key,
  gridSize,
  gameStatus,
  isChallenge,
  isPicked,
  onClick
}) => {
  const cellWidth = 100 / gridSize;
  let cellStatus = CellStatus.NORMAL;
  if (gameStatus !== GameStatus.NEW) {
    if (isPicked) {
      cellStatus = isChallenge ? CellStatus.CORRECT : CellStatus.WRONG;
    } else if (
      isChallenge &&
      (gameStatus === GameStatus.CHALLENGE || gameStatus === GameStatus.LOST)
    ) {
      cellStatus = CellStatus.HIGHLIGHT;
    }
  }

  return (
    <div
      className="cell"
      style={{ width: `${cellWidth}%`, backgroundColor: cellStatus }}
      onClick={onClick}
    />
  );
};

const Messages = {
  NEW: "You will have a few seconds to memorize the blue random cells",
  CHALLENGE: "Remember these blue cells now",
  PLAYING: "Which cells were blue?",
  WON: "Victory!",
  LOST: "Game Over"
};

const Footer = ({ gameStatus, countdown, startGame, resetGame }) => {
  const buttonAreaContent = () => {
    switch (gameStatus) {
      case GameStatus.NEW:
        return <button onClick={startGame}>Start Game</button>;
      case GameStatus.CHALLENGE:
      case GameStatus.PLAYING:
        return countdown;
      case GameStatus.WON:
      case GameStatus.LOST:
        return <button onClick={resetGame}>Play Again</button>;
    }
  };

  return (
    <>
      <div className="message">{Messages[gameStatus]}</div>{" "}
      <div className="button">{buttonAreaContent()}</div>{" "}
    </>
  );
};

// Math science
const utils = {
  /* Create an array based on a numeric size property.
     Example: createArray(5) => [0, 1, 2, 3, 4] */
  createArray: size => Array.from({ length: size }, (_, i) => i),

  /* Pick random elements from origArray up to sampleSize
     And use them to form a new array.
     Example: sampleArray([9, 12, 4, 7, 5], 3) => [12, 7, 5] */
  sampleArray: (origArray, sampleSize) => {
    const copy = origArray.slice(0);
    const sample = [];
    for (let i = 0; i < sampleSize && i < copy.length; i++) {
      const index = Math.floor(Math.random() * copy.length);
      sample.push(copy.splice(index, 1)[0]);
    }
    return sample;
  },

  /* Given a srcArray and a crossArray, count how many elements 
     in srcArray exist or do not exist in crossArray.
     Returns an array like [includeCount, excludeCount]
     Example: arrayCrossCounts([0, 1, 2, 3, 4], [1, 3, 5]) => [2, 3] */
  arrayCrossCounts: (srcArray, crossArray) => {
    let includeCount = 0;
    let excludeCount = 0;
    srcLoop: for (let s = 0; s < srcArray.length; s++) {
      for (let c = 0; c < crossArray.length; c++) {
        if (crossArray[c] === srcArray[s]) {
          includeCount += 1;
          continue srcLoop;
        }
      }
      excludeCount += 1;
    }
    return [includeCount, excludeCount];
  }
};
