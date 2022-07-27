import { useState } from 'react';
import Board from './components/Board';

const App = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) }
  ])
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const jumpTo = (step) => {
    // console.log('step', step);
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    console.log('new history', newHistory);
    const newCurrent = newHistory[newHistory.length - 1];
    console.log('newCurrent', newCurrent);

    const newSquares = newCurrent.squares.slice();
    console.log('newSquares', newSquares);

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext(current => !current);

    setStepNumber(newHistory.length);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default App

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
    if (
      squares[a]
      && squares[a] === squares[b]
      && squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
