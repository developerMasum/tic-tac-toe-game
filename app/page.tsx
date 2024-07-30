"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Square from "./components/main";

function Home() {
  const [turn, setturn] = useState(1);
  const [winner, setwinner] = useState(0);
  const [moves, setmoves] = useState(0);
  const [color, setcolor] = useState("#dd8e6f");
  let initTable = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const [tableArray, setTableArray] = useState(initTable);
  const [gamerunning, setgamerunning] = useState(true);

  // Load sound effects
  const player1Sound = new Audio("/assets/m1.wav"); // Adjust the path according to your directory structure
  const player2Sound = new Audio("/assets/m2.wav");
  const winSound = new Audio("/assets/win.mp3");
  const drawSound = new Audio("/assets/over.mp3");
  console.log(moves);
  useEffect(() => {
    if (!gamerunning) {
      if (moves !== 9) {
        toast.success(`Player ${winner === 1 ? "X" : "O"} is the winner`, {
          position: "bottom-center",
          autoClose: 3000,
        });
        winSound.play();
      } else if (moves === 9) {
        toast.success("The match ended in a draw", {
          position: "bottom-center",
          autoClose: 3000,
        });
        drawSound.play();
      }

      setTimeout(() => {
        Reset();
      }, 3000);
    }
  }, [gamerunning, moves, winner]);

  function Reset() {
    initTable = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    setTableArray(initTable);
    setgamerunning(true);
    setmoves(0);
    setwinner(0);
    setturn(1);
    setcolor("#de8f70");
  }

  function checkArray(arr: any) {
    if (
      (arr[0][0] === 1 && arr[1][1] === 1 && arr[2][2] === 1) ||
      (arr[0][0] === 2 && arr[1][1] === 2 && arr[2][2] === 2)
    ) {
      setwinner(turn);
      return false;
    }

    for (let i = 0; i < 3; i++) {
      if (
        (arr[i][0] === 1 && arr[i][1] === 1 && arr[i][2] === 1) ||
        (arr[i][0] === 2 && arr[i][1] === 2 && arr[i][2] === 2)
      ) {
        setwinner(turn);
        return false;
      } else if (
        (arr[0][i] === 1 && arr[1][i] === 1 && arr[2][i] === 1) ||
        (arr[0][i] === 2 && arr[1][i] === 2 && arr[2][i] === 2)
      ) {
        setwinner(turn);
        return false;
      }
    }

    if (
      (arr[0][2] === 1 && arr[1][1] === 1 && arr[2][0] === 1) ||
      (arr[0][2] === 2 && arr[1][1] === 2 && arr[2][0] === 2)
    ) {
      setwinner(turn);
      return false;
    } else {
      return true;
    }
  }

  function onSquareClick(row: any, col: any) {
    if (!gamerunning || tableArray[row][col] !== 0) return;

    const newTable = [...tableArray];
    newTable[row][col] = turn;
    setTableArray(newTable);

    const hasWinner = checkArray(newTable);
    setgamerunning(hasWinner);

    if (moves === 9) {
      setgamerunning(false);
    }

    if (gamerunning) {
      const m = moves + 1;
      setmoves(m);
      if (moves % 2 === 0) {
        setturn(2);
        setcolor("#3f7cab");
        player2Sound.play(); // Play sound for Player 2
      } else {
        setturn(1);
        setcolor("#dd8e6f");
        player1Sound.play(); // Play sound for Player 1
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen" style={{ backgroundColor: color }}>
        <div className="text-center p-5 text-xl">
          <h1 className="uppercase font-semibold text-gray-200">Tic Tac Toe</h1>
        </div>
        <h2 className="text-center p-2 flex justify-center items-center">
          Turn: Player{" "}
          {turn === 1 ? (
            <p className="text-gray-200 uppercase text-3xl ml-1">X</p>
          ) : (
            <p className="text-gray-200 uppercase text-3xl ml-1">O</p>
          )}
        </h2>
        <div className="tableWrapper flex justify-center">
          <div className="bg-white flex flex-col justify-center">
            <div className="flex w-auto justify-center">
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[0][0]}
                row={0}
                col={0}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[0][1]}
                row={0}
                col={1}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[0][2]}
                row={0}
                col={2}
                gamerunning={gamerunning}
              />
            </div>
            <div className="flex w-auto justify-center">
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[1][0]}
                row={1}
                col={0}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[1][1]}
                row={1}
                col={1}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[1][2]}
                row={1}
                col={2}
                gamerunning={gamerunning}
              />
            </div>
            <div className="flex w-auto justify-center">
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[2][0]}
                row={2}
                col={0}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[2][1]}
                row={2}
                col={1}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[2][2]}
                row={2}
                col={2}
                gamerunning={gamerunning}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center p-5">
          <button
            title="Reset"
            onClick={Reset}
            className="flex justify-center px-3 py-2 bg-red-700 text-white rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
