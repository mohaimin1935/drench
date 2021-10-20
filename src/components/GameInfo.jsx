const GameInfo = ({ game, initializeBoard, setGame }) => {
  return (
    <>
      {game !== "playing" && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex">
          <div className="w-10/12 m-auto px-12 py-6 bg-white rounded-lg shadow-2xl text-indigo-900">
            <p className="text-2xl font-bold">
              {game === "win" && "You won!"}
              {game === "lost" && "You lost!"}
              {game === "help" &&
                "Make all grids of single color by using the buttons."}
            </p>
            <button
              className="mt-4 px-6 py-1.5 inline-block rounded font-semibold bg-indigo-200 hover:bg-indigo-300 duration-300 shadow-lg hover:shadow-md"
              onClick={() => {
                if (game !== "help") initializeBoard();
                else setGame("playing");
              }}
            >
              {game === "help" ? "OK" : "Start Again"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameInfo;
