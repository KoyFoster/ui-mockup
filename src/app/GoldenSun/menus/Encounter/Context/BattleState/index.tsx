import React, { createContext, useReducer, useState } from 'react';
import battleMenuReducer from '../../../reducers/battleMenuReducer';
import './index.scss';

export const BattleStateContext = createContext({
  menuState: {},
} as { menuState: BattleMenuState; setMenuState: React.Dispatch<BattleMenuAction>; toolTip: string; setToolTip: React.Dispatch<React.SetStateAction<string>> });

const DEBUG = false;
const BattleState = ({ children }: { children: React.ReactNode }) => {
  const [turns, setTurns] = useState(0);
  const [phase, SetPhase] = useState('start' as 'start' | 'team-A' | 'team-B' | 'simulate' | 'end');
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
        <div className='battle-state-debugger'>
          Menu: {menuState.menu} History:{' '}
          {menuState.history.map((mh) => {
            return `[${mh}]`;
          })}
        </div>
      )}
      {children}
    </BattleStateContext.Provider>
  );
};

export default BattleState;
