import { useContext, useEffect } from 'react';
import TransientPopup from 'src/app/popups/transient-popup';
import { SoundControllerContext } from '../../assets/sounds';
import { BattleStateContext } from './context/battle-state';
import {
  ConfirmTarget,
  Decision,
  Djinn,
  Energy,
  Fight,
  Items,
  Status,
  Summon,
} from './sub-menus';

const BattleMenus = {
  decision: <Decision></Decision>,
  fight: <Fight></Fight>,
  run: <div>Run</div>,
  status: <Status></Status>,
  attack: <div>Atttack</div>,
  energy: <Energy></Energy>,
  summon: <Summon></Summon>,
  djinn: <Djinn></Djinn>,
  items: <Items></Items>,
  defend: <div>Defend</div>,
  'confirm-target': <ConfirmTarget></ConfirmTarget>,
} as BattleMenus;

const BattleMenu = () => {
  const { menuNagtive } = useContext(SoundControllerContext);
  const { menuState, setMenuState, toolTip } = useContext(BattleStateContext);
  const { renderMessages, addTransientMessage } = TransientPopup();

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      menuNagtive.Play();
      setMenuState({ type: 'RETURN' });
    };

    window.addEventListener('keyup', onEscape);
    return () => {
      window.removeEventListener('keyup', onEscape);
    };
  }, [menuNagtive, setMenuState]);

  return (
    <>
      {renderMessages()}
      <div className="menu-container">
        <img
          id="Portrait"
          src="../assets/sprites/portrait.jpg"
          alt="Portrait"
          className="portrait"
        />
        <div className='battle-menu-container'>
          {BattleMenus[menuState.menu]}
          <div key="menu-tool-tip" className="menu-frame" id={toolTip} />
        </div>
      </div>
    </>
  );
};

export default BattleMenu;
