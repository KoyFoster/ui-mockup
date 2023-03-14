import React, { createContext, useState } from 'react';

export const BattleStateContext = createContext({
  menuState: 'decision',
} as BattleStateProps);

const BattleState = ({ children }: { children: React.ReactNode | string }) => {
  const [menuState, setMenuState] = useState('decision' as BattleMenuStates);

  const value = {
    menuState,
    setMenuState,
  };

  return (
    <BattleStateContext.Provider value={value}>
      {children}
    </BattleStateContext.Provider>
  );
};

export default BattleState;
