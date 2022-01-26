import React from 'react';

const Status = ({ winner, current }) => {
  const noMovesLeft = current.board.every(element => {
    return element !== null;
  });
  return (
    <div>
      {winner && (
        <>
          Winner is{' '}
          <span className={winner == 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      )}
      {!winner && !noMovesLeft && (
        <>
          Next player is{' '}
          <span className={current.isXNext ? 'text-green' : 'text-orange'}>
            {current.isXNext ? 'X' : 'O'}
          </span>
        </>
      )}
      {!winner && noMovesLeft && (
        <>
          <span className="text-green">X</span> and{' '}
          <span className="text-orange">O</span> tied
        </>
      )}
    </div>
  );
};

export default Status;
