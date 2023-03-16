import React, { createContext, useReducer, useState } from 'react';
import battleMenuReducer from '../../../reducers/battleMenuReducer';

export const BattleStateContext = createContext({
  menuState: {},
} as { menuState: BattleMenuState; setMenuState: React.Dispatch<BattleMenuAction>; toolTip: string; setToolTip: React.Dispatch<React.SetStateAction<string>> });

const DEBUG = true;
const BattleState = ({ children }: { children: React.ReactNode }) => {
  const [menuState, setMenuState] = useReducer(battleMenuReducer, {
    menu: 'decision',
    history: [],
  } as BattleMenuState);
  const [toolTip, setToolTip] = useState('');

  const value = {
    menuState,
    setMenuState,
    toolTip,
    setToolTip,
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
