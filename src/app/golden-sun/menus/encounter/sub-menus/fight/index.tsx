import React, { useContext, useState } from 'react';
import ActionButton from 'src/app/golden-sun/action-button';
import { BattleStateContext } from '../../context/battle-state';

const Fight = () => {
  const { setMenuState } = useContext(BattleStateContext);
  const [toolTip, setToolTip] = useState('');

  return (
    <>
      <ActionButton
        key="attack"
        id="attack"
        src={''}
        alt="attack"
        tooltip="attack"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'attack' });
        }}
      />
      <ActionButton
        key="energy"
        id="energy"
        src={''}
        alt="energy"
        tooltip="energy"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'energy' });
        }}
      />
      <ActionButton
        key="desummon"
        id="desummon"
        src={''}
        alt="desummon"
        tooltip="desummon"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'desummon' });
        }}
      />
      <ActionButton
        key="summon"
        id="summon"
        src={''}
        alt="summon"
        tooltip="summon"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'summon' });
        }}
      />
      <ActionButton
        key="items"
        id="items"
        src={''}
        alt="items"
        tooltip="items"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'items' });
        }}
      />
      <ActionButton
        key="defend"
        id="defend"
        src={''}
        alt="defend"
        tooltip="defend"
        onToolTip={setToolTip}
        onClick={() => {
          setMenuState({ type: 'GOTO', menu: 'defend' });
        }}
      />
      <div className="menu-frame" id={toolTip} />
    </>
  );
};

export default Fight;
