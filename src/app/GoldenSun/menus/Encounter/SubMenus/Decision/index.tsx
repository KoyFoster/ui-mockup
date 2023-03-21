import { useContext, useEffect } from 'react';
import ActionButton from 'src/app/GoldenSun/components/ActionButton';
import { SpriteControllerContext } from 'src/app/GoldenSun/assets/context';
import { BattleStateContext } from '../../Context/BattleState';

// Use menu context for menu state management
// Use sprite context
const Decision = () => {
  const { setMenuState, setToolTip } = useContext(BattleStateContext);
  const { getSpriteByKey, loadSprite } = useContext(SpriteControllerContext);

  useEffect(() => {
    loadSprite([12, 106, 24, 24], 'fight');
    loadSprite([36, 106, 24, 24], 'run');
    loadSprite([60, 106, 24, 24], 'status');
  }, [loadSprite]);

  return (
    <div className='decision-menu'>
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
    </div>
  );
};

export default Decision;
