import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faTrophy } from "@fortawesome/free-solid-svg-icons";

function Square({ value, onSquareClick }) {
  const squareClass = value === "X" ? "X" : value === "O" ? "O" : "";
  return (
    <button className={`square ${squareClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [draw, setDraw] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || draw) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
    if (!nextSquares.includes(null) && !calculateWinner(nextSquares)) {
      setDraw(true);
    }
  }

  const winner = calculateWinner(squares);
  let status;
  let statusClass;
  if (winner) {
    status = (
      <span>
        <FontAwesomeIcon icon={faTrophy} /> Winner: {winner}
      </span>
    );
    statusClass = "winner animate-pulse";
  } else if (draw) {
    status = "It's a draw!";
    statusClass = "draw animate-bounce";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
    statusClass = "status animate-fade-in";
  }

  useEffect(() => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bgLight dark:bg-bgDark transition-colors duration-500">
      <button
        onClick={toggleDarkMode}
        className={`relative w-16 h-8 bg-gradient-to-r from-yellow-400 to-red-500 dark:from-purple-600 dark:to-blue-500 rounded-full p-1 flex items-center transition-colors duration-500 mb-4`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ${
            isDarkMode ? "translate-x-8" : ""
          }`}
        ></div>
        <FontAwesomeIcon
          icon={faSun}
          className="absolute left-1 text-yellow-500 dark:hidden"
        />
        <FontAwesomeIcon
          icon={faMoon}
          className="absolute right-1 text-blue-300 hidden dark:block"
        />
      </button>
      <div className={`mb-8 text-2xl status-container`}>
        <div className={`${statusClass} animate-fade-in`}>{status}</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
