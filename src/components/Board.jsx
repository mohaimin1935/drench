import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import GameInfo from "./GameInfo";

const GRID_SIZE = 14;

const Board = () => {
  const [board, setBoard] = useState();
  const [count, setCount] = useState(30);
  const [game, setGame] = useState("playing");

  const ARRAY_14x14 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let tempBoard = ARRAY_14x14;

  const initializeBoard = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        let randomNumber = Math.floor(Math.random() * 6);
        if (randomNumber === 0) tempBoard[i][j] = "green";
        else if (randomNumber === 1) tempBoard[i][j] = "pink";
        else if (randomNumber === 2) tempBoard[i][j] = "indigo";
        else if (randomNumber === 3) tempBoard[i][j] = "red";
        else if (randomNumber === 4) tempBoard[i][j] = "yellow";
        else if (randomNumber === 5) tempBoard[i][j] = "gray";
      }
    }
    setGame("playing");
    setBoard(tempBoard);
    setCount(30);
  };

  const isWin = () => {
    if (!board) return false;
    let cornerColor = board[0][0];
    if (cornerColor === 0) return false;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] !== cornerColor) return false;
      }
    }

    return true;
  };

  const isValidPos = (pos, cornerColor, visited) => {
    return (
      pos.row < GRID_SIZE &&
      pos.col < GRID_SIZE &&
      pos.row >= 0 &&
      pos.col >= 0 &&
      visited[pos.row][pos.col] === 0 &&
      tempBoard[pos.row][pos.col] === cornerColor
    );
  };

  const handleColor = (color) => {
    setCount((prev) => (prev > 0 ? prev - 1 : prev));

    tempBoard = board;
    const visited = ARRAY_14x14;
    let cornerColor = board[0][0];
    let pos = [];
    pos.push({ row: 0, col: 0 });

    while (pos.length > 0) {
      let currentPos = pos.pop();
      tempBoard[currentPos.row][currentPos.col] = color;
      visited[currentPos.row][currentPos.col] = 1;

      let rightPos = { row: currentPos.row, col: currentPos.col + 1 };
      let bottomPos = { row: currentPos.row + 1, col: currentPos.col };
      let leftPos = { row: currentPos.row, col: currentPos.col - 1 };
      let topPos = { row: currentPos.row - 1, col: currentPos.col };

      if (isValidPos(rightPos, cornerColor, visited)) pos.push(rightPos);
      if (isValidPos(leftPos, cornerColor, visited)) pos.push(leftPos);
      if (isValidPos(topPos, cornerColor, visited)) pos.push(topPos);
      if (isValidPos(bottomPos, cornerColor, visited)) pos.push(bottomPos);
    }

    setBoard(tempBoard);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (isWin()) {
      setGame("win");
    } else if (count === 0) setGame("lost");
  }, [board, count]);

  return (
    <div>
      <div className="w-20 h-20 rounded-full mx-auto my-4 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 shadow-xl">
        <p className="text-indigo-50 text-4xl font-semibold bg-red">{count}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4 text-lg">
        <button
          className="px-6 py-1.5 inline-block rounded font-semibold bg-indigo-200 hover:bg-indigo-300 duration-300 shadow-lg hover:shadow-md"
          onClick={() => initializeBoard()}
        >
          Reset
        </button>
        <button
          className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-red-200 text-red-800 font-semibold duration-300 shadow-lg hover:shadow-md text-sm"
          onClick={() => setGame("help")}
        >
          ?
        </button>
      </div>

      <div className="relative shadow-lg p-2 border">
        <GameInfo
          game={game}
          initializeBoard={initializeBoard}
          setGame={setGame}
        />
        {board?.map((row, index) => (
          <div className="flex" key={index}>
            {row.map((box, index) => (
              <div
                className={`w-6 h-6 bg-${box}-500 duration-100`}
                key={index}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <Buttons handleColor={handleColor} />
    </div>
  );
};

export default Board;
