import { useContext, useEffect, useState } from 'react';
import ActionButton from 'src/app/golden-sun/action-button';
import { SpriteControllerContext } from 'src/app/golden-sun/assets/context';
import { BattleStateContext } from '../../context/battle-state';

// Use menu context for menu state management
// Use sprite context
const Decision = () => {
  const { setMenuState } = useContext(BattleStateContext);
  const [toolTip, setToolTip] = useState('');
  const { getSpriteByKey, loadSprite } = useContext(SpriteControllerContext);

  useEffect(() => {
    loadSprite([12, 106, 24, 24], 'fight');
    loadSprite([36, 106, 24, 24], 'run');
    loadSprite([60, 106, 24, 24], 'status');
  }, [loadSprite]);

  return (
    <>
      <ActionButton
        key="fight"
        id="fight"
        src={getSpriteByKey('fight')}
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
        src={getSpriteByKey('run')}
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
        src={getSpriteByKey('status')}
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
