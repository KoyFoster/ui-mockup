import { useContext, useEffect } from 'react';
import TransientPopup from 'src/app/popups/transient-popup';
import { SoundControllerContext } from '../../assets/sounds';
import { BattleStateContext } from './context/battle-state';
import {
  ConfirmTarget, Decision, Desummon,
  Energy,
  Fight,
  Items,
  Status,
  Summon
} from './sub-menus';

const BattleMenus = {
  decision: <Decision></Decision>,
  fight: <Fight></Fight>,
  run: <div>Run</div>,
  status: <Status></Status>,
  attack: <div>Atttack</div>,
  energy: <Energy></Energy>,
  summon: <Summon></Summon>,
  desummon: <Desummon></Desummon>,
  items: <Items></Items>,
  defend: <div>Defend</div>,
  'confirm-target': <ConfirmTarget></ConfirmTarget>,
} as BattleMenus;

const BattleMenu = () => {
  const {menuNagtive} = useContext(SoundControllerContext);
  const { menuState, setMenuState } = useContext(BattleStateContext);
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

  // const handleActionClick = (
  //   actionId: string,
  //   menu?: MenuNode,
  //   action?: () => void
  // ) => {
  //   // Check for menu
  //   if (menu?.options) {
  //     setMenuPosition({
  //       context: menu,
  //       path: '',
  //     });
  //   }
  //   // Run Behavior
  //   else {
  //     if (action) action();
  //     else addTransientMessage(actionId);
  //   }
  // };

  return (
    <>
      {renderMessages()}
      <div className="menu">
        <img
          id="Portrait"
          src="../assets/sprites/portrait.jpg"
          alt="Portrait"
        />
        <div id="Gap" />
        {BattleMenus[menuState.menu]}
      </div>
    </>
  );
};

export default BattleMenu;
