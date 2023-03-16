import React, { createContext, useReducer, useState } from 'react';
import battleMenuReducer from '../../../reducers/battleMenuReducer';

export const BattleStateContext = createContext({
  menuState: {},
} as { menuState: BattleMenuState; setMenuState: React.Dispatch<BattleMenuAction>; });

const DEBUG = true;
const BattleState = ({ children }: { children: React.ReactNode }) => {
  const [menuState, setMenuState] = useReducer(battleMenuReducer, {
    menu: 'decision',
    history: [],
  } as BattleMenuState);

  const value = {
    menuState,
    setMenuState,
  };

  return (
    <BattleStateContext.Provider value={value}>
      {!DEBUG || (
        <>
          Menu: {menuState.menu} History:{' '}
          {menuState.history.map((mh) => {
            return `[${mh}]`;
          })}
        </>
      )}
      {children}
    </BattleStateContext.Provider>
  );
};

export default BattleState;
