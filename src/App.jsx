import React, { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './helper';
import './styles/root.scss';

const App = () => {
  const [history, setHistorty] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]); //Storing the array of object for the histroty at that given point
  // const [isXNext, setisXNext] = useState(false);
  // console.log(board);
  // console.log(setBoard);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];
  // console.log('history', history);
  const winner = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;
  const handelSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistorty(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prev => prev + 1);
    // setisXNext(prev => {
    //   return !prev;
    // });
  };
  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board board={current.board} handelSquareClick={handelSquareClick} />
    </div>
  );
};

export default App;
