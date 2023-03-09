import { cloneDeep } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import TransientPopup from '../../../popups/transient-popup';
import ActionButton from '../../action-button';
import MenuMove from '../../assets/sounds/MenuMove.wav';
import menuSheet from '../../assets/sprites/Golden-Sun-Menu-Assets.png';
import Menu from '../../data/battle-menu.json';
import Party from '../../party';
import getSprites from '../../util/sprite-sheet-parser';
import './index.scss';
const BattleMenu = Menu as MenuNode;

// TODO (2023-03-06 17:40:33): Refactor menu code

const Battle = () => {
  const menuMoveRef = useRef(new Audio(MenuMove) as null | HTMLAudioElement);
  const { current: menuMove } = menuMoveRef;
  const { renderMessages, addTransientMessage } = TransientPopup();
  const [actionMenu, setActionMenu] = useState(cloneDeep(BattleMenu));
  const [toolTip, setToolTip] = useState('');
  const [menuPosition, setMenuPosition] = useState({
    context: actionMenu,
    path: '',
  });
  const [loaded, setLoaded] = useState(false);

  const loadSprites = async () => {
    const menu = menuPosition.context;
    const { options } = menu;

    if (!menu.loaded && options) {
      setLoaded(false);
      const maps = options.map((option) => menu[option].map);
      const sprites = await getSprites(menuSheet, maps);
      options.forEach((option, i) => (menu[option].sprite = sprites[i]));
      setActionMenu(actionMenu);
      menu.loaded = true;
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadSprites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuPosition?.context]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // go back a menu
      setMenuPosition((menuPosition) => {
        const { parent } = menuPosition.context;
        if (parent) {
          // TODO (2023-03-05): Too tired to do circular dependencies right now. Maybe later
          // menuPosition.context = menuPosition.context?.parent;
          const path = parent.split(',');
          if (path.length === 1) {
            menuPosition.context = actionMenu;
          }
        }
        return { ...menuPosition };
      });
    };
    window.addEventListener('keyup', onEscape);
    return () => {
      window.removeEventListener('keyup', onEscape);
    };
  }, [actionMenu]);

  const handleActionClick = (
    actionId: string,
    menu?: MenuNode,
    action?: () => void
  ) => {
    // Check for menu
    if (menu?.options) {
      setMenuPosition({
        context: menu,
        path: '',
      });
    }
    // Run Behavior
    else {
      if (action) action();
      else {
        addTransientMessage(actionId);
      }
    }
  };

  function getMenu() {
    return menuPosition.context?.options?.map((option) => {
      const menu = menuPosition.context;
      if (!menu) return null;
      const item = menu[option] as MenuNode;
      const { id: itemId } = item;

      return (
        <ActionButton
          key={option}
          id={itemId}
          src={item.sprite}
          alt={itemId}
          onClick={() => {
            if (menuPosition.context)
              handleActionClick(
                itemId,
                menu[itemId],
                menuPosition.context[itemId].action
              );
          }}
          onMouseOver={() => {
            if (menuPosition.context)
              setToolTip(menuPosition.context[itemId].label);
            menuMove?.play();
          }}
          onMouseLeave={() => {
            setToolTip('');
          }}
          onFocus={() => {
            if (menuPosition.context)
              setToolTip(menuPosition.context[itemId].label);
            menuMove?.play();
          }}
        />
      );
    });
  }

  return !loaded ? (
    <p style={{ textAlign: 'center' }}>Loading...</p>
  ) : (
    <div className="gs-battle">
      {renderMessages()}
      <Party />
      <div className="menu">
        <img
          id="Portrait"
          src="../assets/sprites/portrait.jpg"
          alt="Portrait"
        />
        <div id="Gap" />
        <div className="actions">{getMenu()}</div>
        <div className="menu-frame" id={toolTip} />
      </div>
    </div>
  );
};

export default Battle;
