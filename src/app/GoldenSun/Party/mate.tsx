import React from 'react';

const Mate = ({ id, hp, pp }: { id: string; hp: number; pp: number }) => {
  return (
    <div id={id} className="mate">
      <div className="hp">{hp}</div>
      <div className="pp">{pp}</div>
    </div>
  );
};

export default Mate;
