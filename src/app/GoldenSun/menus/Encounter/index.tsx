import { useContext, useEffect } from 'react';
import TransientPopup from 'src/app/popups/TransientPopup';
import { SoundControllerContext } from '../../assets/sounds';
import { BattleStateContext } from './Context/BattleState';
import {
  ConfirmTarget,
  Decision,
  Djinn,
  Energy,
  Fight,
  Items,
  Status,
  Summon,
} from './SubMenus';

const BattleMenus = {
  decision: <Decision></Decision>,
  fight: <Fight></Fight>,
  run: <div>Run</div>,
  status: <Status></Status>,
  attack: <div>Attack</div>,
  energy: <Energy></Energy>,
  summon: <Summon></Summon>,
  djinn: <Djinn></Djinn>,
  items: <Items></Items>,
  defend: <div>Defend</div>,
  'confirm-target': <ConfirmTarget></ConfirmTarget>,
} as BattleMenus;

const BattleMenu = () => {
  const { menuNegative } = useContext(SoundControllerContext);
  const { menuState, setMenuState, toolTip } = useContext(BattleStateContext);
  const { renderMessages, addTransientMessage } = TransientPopup();

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      menuNegative.Play();
      setMenuState({ type: 'RETURN' });
    };

    window.addEventListener('keyup', onEscape);
    return () => {
      window.removeEventListener('keyup', onEscape);
    };
  }, [menuNegative, setMenuState]);

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
