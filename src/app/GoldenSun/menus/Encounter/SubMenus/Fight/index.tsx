import { useContext, useEffect } from 'react';
import ActionButton from 'src/app/GoldenSun/components/ActionButton';
import { SpriteControllerContext } from 'src/app/GoldenSun/assets/context';
import { BattleStateContext } from '../../Context/BattleState';
import './index.scss';

const Fight = () => {
  const { setMenuState, setToolTip } = useContext(BattleStateContext);
  const { getSpriteByKey, loadSprite } = useContext(SpriteControllerContext);

  useEffect(() => {
    loadSprite([12, 134, 24, 24], 'attack');
    loadSprite([36, 134, 24, 24], 'energy');
    loadSprite([60, 134, 24, 24], 'djinn');
    loadSprite([84, 134, 24, 24], 'summon');
    loadSprite([108, 134, 24, 24], 'items');
    loadSprite([132, 134, 24, 24], 'defend');
  }, [loadSprite]);

  return (
    <div className='battle-menu fight-menu'>
      <ActionButton
        key="attack"
        id="attack"
        src={getSpriteByKey('attack')}
        alt="attack"
        tooltip="Attack"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'attack' });
        }}
      />
      <ActionButton
        key="energy"
        id="energy"
        src={getSpriteByKey('energy')}
        alt="energy"
        tooltip="Energy"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'energy' });
        }}
      />
      <ActionButton
        key="djinn"
        id="djinn"
        src={getSpriteByKey('djinn')}
        alt="djinn"
        tooltip="Djinn"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'djinn' });
        }}
      />
      <ActionButton
        key="summon"
        id="summon"
        src={getSpriteByKey('summon')}
        alt="summon"
        tooltip="Summon"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'summon' });
        }}
      />
      <ActionButton
        key="items"
        id="items"
        src={getSpriteByKey('items')}
        alt="items"
        tooltip="Items"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'items' });
        }}
      />
      <ActionButton
        key="defend"
        id="defend"
        src={getSpriteByKey('defend')}
        alt="defend"
        tooltip="Defend"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'defend' });
        }}
      />
    </div>
  );
};

export default Fight;
