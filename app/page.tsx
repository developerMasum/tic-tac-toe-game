"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Square from "./components/main";

function Home() {
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(0);
  const [moves, setMoves] = useState(0);
  const [color, setColor] = useState("#dd8e6f");
  const [tableArray, setTableArray] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [gameRunning, setGameRunning] = useState(true);

  // Load sound effects
  const player1Sound = new Audio("/assets/m1.wav"); // Adjust the path according to your directory structure
  const player2Sound = new Audio("/assets/m2.wav");
  const winSound = new Audio("/assets/win.mp3");
  const drawSound = new Audio("/assets/over.mp3");

  useEffect(() => {
    if (!gameRunning) {
      if (winner) {
        toast.success(`Player ${winner === 1 ? "X" : "O"} is the winner`, {
          position: "bottom-center",
          autoClose: 3000,
        });
        winSound.play();
      } else {
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
  }, [gameRunning, winner]);

  function Reset() {
    setTableArray([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setGameRunning(true);
    setMoves(0);
    setWinner(0);
    setTurn(1);
    setColor("#de8f70");
  }

  function checkArray(arr: number[][]) {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
      if (
        (arr[i][0] === 1 && arr[i][1] === 1 && arr[i][2] === 1) ||
        (arr[i][0] === 2 && arr[i][1] === 2 && arr[i][2] === 2)
      ) {
        setWinner(turn);
        return false;
      }

      if (
        (arr[0][i] === 1 && arr[1][i] === 1 && arr[2][i] === 1) ||
        (arr[0][i] === 2 && arr[1][i] === 2 && arr[2][i] === 2)
      ) {
        setWinner(turn);
        return false;
      }
    }

    if (
      (arr[0][0] === 1 && arr[1][1] === 1 && arr[2][2] === 1) ||
      (arr[0][0] === 2 && arr[1][1] === 2 && arr[2][2] === 2)
    ) {
      setWinner(turn);
      return false;
    }

    if (
      (arr[0][2] === 1 && arr[1][1] === 1 && arr[2][0] === 1) ||
      (arr[0][2] === 2 && arr[1][1] === 2 && arr[2][0] === 2)
    ) {
      setWinner(turn);
      return false;
    }

    return true;
  }

  function onSquareClick(row: any, col: any) {
    if (!gameRunning || tableArray[row][col] !== 0) return;

    const newTable = [...tableArray];
    newTable[row][col] = turn;
    setTableArray(newTable);

    const hasWinner = checkArray(newTable);
    if (!hasWinner) {
      setGameRunning(false);
      return;
    }

    if (moves === 8) {
      setGameRunning(false);
      return;
    }

    setMoves(moves + 1);
    setTurn(turn === 1 ? 2 : 1);
    setColor(turn === 1 ? "#3f7cab" : "#dd8e6f");

    if (turn === 1) {
      player1Sound.play();
    } else {
      player2Sound.play();
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
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex w-auto justify-center">
                {[0, 1, 2].map((col) => (
                  <Square
                    key={col}
                    onfunctionClick={onSquareClick}
                    value={tableArray[row][col]}
                    row={row}
                    col={col}
                    gamerunning={gameRunning}
                  />
                ))}
              </div>
            ))}
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
