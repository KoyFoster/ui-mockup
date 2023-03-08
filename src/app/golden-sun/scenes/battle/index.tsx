import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import TransientPopup from '../../../popups/transient-popup';
import ActionButton from '../../action-button';
import menuSheet from '../../assets/sprites/Golden-Sun-Menu-Assets.png';
import Menu from '../../data/battle-menu.json';
import Party from '../../party';
import './index.scss';
const BattleMenu = Menu as BattleMenu;

// TODO (2023-03-06 17:37:29): Refactor sprite related code
// TODO (2023-03-06 17:40:33): Refactor Menu Code

/* Globals */
interface MenuItem {
  id: string;
  label: string;
  map: [number, number, number, number];
  sprite: string;
  menu: MenuItem;
  action: () => void;
}

function loadImage(url: string) {
  return new Promise((r) => {
    const i = new Image();
    i.onload = () => r(i);
    i.src = url;
  });
}

// const map: [12, 134, 2, 24];
async function getSprite(map: [number, number, number, number]) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const img = (await loadImage(menuSheet)) as CanvasImageSource;

  const ctx = canvas?.getContext('2d');
  canvas.width = map[2];
  canvas.height = map[3];

  ctx?.drawImage(img, map[0], map[1], map[2], map[3], 0, 0, map[2], map[3]);
  const cache = canvas.toDataURL('image/jpg');

  return cache;
}

// Basic Settings

const Battle = () => {
  const { renderMessages, addTransientMessage } = TransientPopup();
  const [actionMenu, setActionMenu] = useState(cloneDeep(BattleMenu));
  const [toolTip, setToolTip] = useState('');
  const [menuPosition, setMenuPosition] = useState({
    context: actionMenu,
    path: '',
  });
  const [loaded, setLoaded] = useState(false);

  function loadSprites() {
    const { menu } = menuPosition.context;
    console.log({ menu });
    // setLoaded(false);
    menu?.keys.forEach(async (key: string, i: number) => {
      const item = menu[key] as MenuItem;
      if (!item.sprite && item.map) {
        item.sprite = await getSprite(item.map);

        if (i + 1 === menu.keys.length) {
          menu[key].isLoaded = true;
          setActionMenu(actionMenu);
          console.log('sprites loaded');
        }
      }
      setLoaded(true);
    });
    // Update State
  }

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
          // TODO (2023-03-05): To tired to do circular dependencies right now. Maybe later
          // menuPosition.context = menuPosition.context?.menu?.parent;
          const path = parent.split(',');
          if (path.length === 1) {
            menuPosition.context = actionMenu;
          }
        }
        // new path
        console.log({ context: menuPosition.context.id });
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
    menu: MenuItem,
    action?: () => void
  ) => {
    // Check for menu
    if (menu.menu) {
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
    return menuPosition.context?.menu?.keys.map((key: string) => {
      const { menu } = menuPosition.context;
      const item = menu[key] as MenuItem;
      const { id: itemId } = item;

      return (
        <ActionButton
          key={key}
          id={itemId}
          src={item.sprite}
          alt={itemId}
          onClick={() => {
            handleActionClick(
              itemId,
              menu[itemId],
              menuPosition.context.menu[itemId].action
            );
          }}
          onMouseOver={() => {            
            setToolTip( menuPosition.context.menu[itemId].label);
          }}
          onMouseLeave={() => {            
            setToolTip('');
          }}
          onFocus={() => {            
            setToolTip( menuPosition.context.menu[itemId].label);
          }}
        />
      );
    });
  }

  return !loaded ? (
    <p style={{ textAlign: 'center' }}>Loading...</p>
  ) : (
    <div className='gs-battle'>
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
