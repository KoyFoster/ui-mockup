import React, { useContext, useState } from 'react';
import ActionButton from 'src/app/golden-sun/action-button';
import { BattleStateContext } from '../../context/battle-state';

// Use menu context for menu state management
// Use sprite context
const Decision = () => {
  const { setMenuState } = useContext(BattleStateContext);
  const [toolTip, setToolTip] = useState('');

  return (
    <>
      <ActionButton
        key="fight"
        id="fight"
        src={''}
        alt="fight"
        tooltip="Fight"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'fight' });
        }}
      />
      <ActionButton
        key="run"
        id="run"
        src={''}
        alt="run"
        tooltip="Run"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'run' });
        }}
      />
      <ActionButton
        key="status"
        id="status"
        src={''}
        alt="status"
        tooltip="Status"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'status' });
        }}
      />
      <div className="menu-frame" id={toolTip} />
    </>
  );
};

export default Decision;
