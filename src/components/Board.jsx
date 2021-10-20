import { useEffect, useState } from "react";

const GRID_SIZE = 14;

const Board = () => {
  const [board, setBoard] = useState();
  const [count, setCount] = useState(30);

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
    setBoard(tempBoard);
    setCount(30);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

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

  return (
    <div>
      <div className="w-20 h-20 rounded-full mx-auto my-4 flex items-center justify-center bg-indigo-600">
        <p className="text-indigo-50 text-4xl font-semibold bg-red">{count}</p>
      </div>

      <div
        className="bg-indigo-100 px-6 py-1.5 inline-block rounded shadow mb-4 text-lg font-semibold hover:bg-indigo-200 text-indigo-900 border-2 border-indigo-600 duration-300 cursor-pointer"
        onClick={() => initializeBoard()}
      >
        Reset
      </div>

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

      <div className="flex items-center justify-center gap-4 mt-4">
        <div
          className="w-8 h-8 bg-green-500 rounded ring ring-green-200 cursor-pointer"
          onClick={() => {
            handleColor("green");
          }}
        />
        <div
          className="w-8 h-8 bg-indigo-500 rounded ring ring-indigo-200 cursor-pointer"
          onClick={() => {
            handleColor("indigo");
          }}
        />
        <div
          className="w-8 h-8 bg-red-500 rounded ring ring-red-200 cursor-pointer "
          onClick={() => {
            handleColor("red");
          }}
        />
        <div
          className="w-8 h-8 bg-yellow-500 rounded ring ring-yellow-200 cursor-pointer"
          onClick={() => {
            handleColor("yellow");
          }}
        />
        <div
          className="w-8 h-8 bg-pink-500 rounded ring ring-pink-200 cursor-pointer"
          onClick={() => {
            handleColor("pink");
          }}
        />
        <div
          className="w-8 h-8 bg-gray-500 rounded ring ring-gray-200 cursor-pointer"
          onClick={() => {
            handleColor("gray");
          }}
        />
      </div>
    </div>
  );
};

export default Board;
