import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import Status from './components/Status';
import { calculateWinner } from './helper';
import './styles/root.scss';
const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];
const App = () => {
  const [history, setHistory] = useState(NEW_GAME); //Storing the array of object for the histroty at that given point
  // const [isXNext, setisXNext] = useState(false);
  // console.log(board);
  // console.log(setBoard);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];
  // console.log('history', history);
  const { winner, winningSquare } = calculateWinner(current.board);

  const handelSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory(prev => {
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
  const moveTo = move => {
    setCurrentMove(move);
  };
  const newgame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <Status winner={winner} current={current} />
      <Board
        board={current.board}
        handelSquareClick={handelSquareClick}
        winningSquare={winningSquare}
      />
      <button type="button" onClick={newgame}>
        Start new game
      </button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
};

export default App;
