import { cloneDeep } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import ActionButton from '../../action-button';
import battleMenu from '../../data/battle-menu.json';
import getSprites from '../../util/sprite-sheet-parser';
import menuSheet from '../../assets/sprites/Golden-Sun-Menu-Assets.png';
import { SoundControllerContext } from '../../assets/sounds';
import TransientPopup from 'src/app/popups/transient-popup';
const Menu = battleMenu as MenuNode;

const BattleMenu = () => {
  const { renderMessages, addTransientMessage } = TransientPopup();
  const sounds = useContext(SoundControllerContext);
  const [loaded, setLoaded] = useState(false);
  const [actionMenu, setActionMenu] = useState(cloneDeep(Menu));
  const [toolTip, setToolTip] = useState('');
  const [menuPosition, setMenuPosition] = useState({
    context: actionMenu,
    path: '',
  });

  const loadSprites = async () => {
    const menu = menuPosition.context;
    const { options } = menu;

    if (!menu.loaded && options) {
      setLoaded(false);
      const sprites = await getSprites(menuSheet, options.map((option) => menu[option].map));
      options.forEach((option, i) => (menu[option].sprite = sprites[i]));
      setActionMenu(actionMenu);
      menu.loaded = true;
      setLoaded(true);
    }
  };

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      const { parent } = menuPosition.context;
      if (parent) {
        // TODO (2023-03-05): Too tired to do circular dependencies right now. Maybe later
        // menuPosition.context = menuPosition.context?.parent;
        const path = parent.split('/');

        let position = actionMenu;
        path.slice(1).forEach((part) => {
          position = position[part];
        });
        menuPosition.context = position;
        sounds.menuNagtive.Play();
      }

      // go back a menu
      setMenuPosition({ ...menuPosition });
    };

    window.addEventListener('keyup', onEscape);
    return () => {
      window.removeEventListener('keyup', onEscape);
    };
  }, [menuPosition.context, actionMenu, sounds.menuNagtive, menuPosition]);

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
      else addTransientMessage(actionId);      
    }
  };

  useEffect(() => {
    loadSprites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuPosition?.context]);

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
            if (menuPosition.context) {
              handleActionClick(
                itemId,
                menu[itemId],
                menuPosition.context[itemId].action
              );
              sounds.menuPositive.Play();
            }
          }}
          onMouseOver={() => {
            if (menuPosition.context)
              setToolTip(menuPosition.context[itemId].label);
            sounds.menuMove.Play();
          }}
          onMouseLeave={() => {
            setToolTip('');
          }}
          onFocus={() => {
            if (menuPosition.context)
              setToolTip(menuPosition.context[itemId].label);
            sounds.menuMove.Play();
          }}
        />
      );
    });
  }

  return !loaded ? (
    <p style={{ textAlign: 'center' }}>Loading...</p>
  ) : (
    <>
      {renderMessages()}
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
    </>
  );
};

export default BattleMenu;
