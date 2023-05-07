import { CSSProperties, useContext, useEffect, useState } from 'react';
import TransientPopup from 'src/app/popups/TransientPopup';
import getPortrait from '../../assets/context/portraits';
import { SoundControllerContext } from '../../assets/sounds';
import { GameDataContext } from '../../Context/GameData';
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

const BattleMenu = ({ style }: { style?: CSSProperties }) => {
  const { party } = useContext(GameDataContext);
  const { menuNegative } = useContext(SoundControllerContext);
  const { menuState, setMenuState, toolTip } = useContext(BattleStateContext);
  const { renderMessages, addTransientMessage } = TransientPopup();
  const [portrait, setPortrait] = useState(null as HTMLImageElement | null);

  useEffect(() => {
    getPortrait(party[3].name, setPortrait);
  }, []);

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
          className="portrait"
          id="Portrait"
          src={portrait?.src ? portrait.src : "../assets/sprites/portrait.jpg"}
          alt="Portrait"
        />
        <div className='battle-menu-container' style={style}>
          {BattleMenus[menuState.menu]}
          <div key="menu-tool-tip" className="menu-frame" id={toolTip} />
        </div>
      </div>
    </>
  );
};

export default BattleMenu;
