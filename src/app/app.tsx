// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, useEffect, useState } from 'react';
import styles from './app.module.scss';
import './app.scss';
import menuSheet from '../assets/sprites/Golden-Sun-Menu-Assets.png';
import { cloneDeep } from 'lodash';

/* Globals */
interface MenuItem {
  id: string;
  label: string;
  map: [number, number, number, number];
  sprite: string;
  menu: MenuItem;
  action: () => void;
}

//
const BattleMenu = {
  id: '.',
  menu: {
    keys: ['fight', 'run', 'status'],
    loaded: false,
    fight: {
      id: 'fight',
      label: 'Fight',
      map: [12, 106, 24, 24],
      sprite: '',
      parent: '.',

      menu: {
        keys: ['attack', 'energy', 'djinn', 'summon', 'items', 'defend'],
        loaded: false,
        attack: {
          id: 'attack',
          label: 'Attack',
          map: [12, 134, 24, 24],
          sprite: '',
        },
        energy: {
          id: 'energy',
          label: 'Energy',
          map: [36, 134, 24, 24],
          sprite: '',
        },
        djinn: {
          id: 'djinn',
          label: 'Djinn',
          map: [60, 134, 24, 24],
          sprite: '',
        },
        summon: {
          id: 'summon',
          label: 'Summon',
          map: [84, 134, 24, 24],
          sprite: '',
        },
        items: {
          id: 'items',
          label: 'Items',
          map: [108, 134, 24, 24],
          sprite: '',
        },
        defend: {
          id: 'defend',
          label: 'Defend',
          map: [132, 134, 24, 24],
          sprite: '',
        },
      },
    },
    run: {
      id: 'run',
      label: 'Run',
      map: [36, 106, 24, 24],
      sprite: '',
      action: () => {
        console.log('コイたち逃げ出した');
      },
    },

    status: {
      id: 'status',
      label: 'Status',
      map: [60, 106, 24, 24],
      sprite: '',
    },
  },
} as {
  [key: string]: MenuItem | string[] | any;
  // keys: string[];
};

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
/** How long the popup for action remains on the screen in milliseconds. */
const actionPopupMessageTimer = 3000;

export function App() {
  const [actionMenu, setActionMenu] = useState(cloneDeep(BattleMenu));
  const [menuPosition, setMenuPosition] = useState({
    context: actionMenu,
    path: '',
  });
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState(
    [] as { id: string; message: string; x: string; y: string; show: boolean }[]
  );
  const [timers, setTimers] = useState([] as NodeJS.Timeout[]);

  useEffect(() => {
    return () => {
      timers.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function getMenu() {
    return menuPosition.context?.menu?.keys.map((key: string) => {
      const { menu } = menuPosition.context;
      const item = menu[key] as MenuItem;
      const { id: itemId } = item;

      return (
        <button
          type="button"
          className="menu-actions"
          key={key}
          onClick={() => {
            // Check for menu
            if (menu[itemId].menu) {
              setMenuPosition({
                context: menu[itemId],
                path: '',
              });
            }
            // Run Behavior
            else {
              if (menuPosition.context.menu[itemId].action)
                menuPosition.context.menu[itemId].action();
              else {
                if (messages.findIndex(({ id }) => id === itemId) < 0) {
                  // TODO (2023-03-05): Throw all this into a reducer
                  // decay
                  const decayTime = setTimeout(() => {
                    setMessages((msgs) =>
                      msgs.filter(({ id }) => id !== itemId)
                    );
                  }, actionPopupMessageTimer);
                  // show
                  const showTime = setTimeout(() => {
                    setMessages((msgs) => {
                      const msg = msgs.find(({ id }) => id === itemId);
                      if (msg) msg.show = true;
                      return [...msgs];
                    });
                  }, 100);
                  // hide
                  const hideTime = setTimeout(() => {
                    setMessages((msgs) => {
                      const msg = msgs.find(({ id }) => id === itemId);
                      if (msg) msg.show = false;
                      return [...msgs];
                    });
                  }, 2000);
                  // Pocket timers for future cleanup
                  setTimers((times) => [
                    ...times,
                    decayTime,
                    showTime,
                    hideTime,
                  ]);

                  setMessages((msgs) => [
                    ...msgs,
                    {
                      id: itemId,
                      message: `You tried to ${itemId}, but nothing happened.`,
                      x: `${Math.floor(Math.random() * 51)}%`,
                      y: `${10 + Math.floor(Math.random() * 41)}%`,
                      show: false,
                    },
                  ]);
                }
              }
            }
          }}
          draggable="false"
          data-tool-tip={`${itemId}`}
        >
          {!item.sprite || (
            <img src={item.sprite} alt={itemId} draggable="false" />
          )}
        </button>
      );
    });
  }

  function getMessages() {
    return messages.map(({ id, message, x, y, show }) => {
      return (
        <div
          key={id}
          id={id}
          className={'action-display-popup' + (show ? ' fade-in' : ' fade-out')}
          style={{ left: x, top: y }}
        >
          {message}
        </div>
      );
    });
  }

  return (
    <div className="App">
      {!loaded ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <>
          {getMessages()}
          <div className="menu-frame team">
            <div id="Koy" className="mate">
              <div className="hp">83</div>
              <div className="pp">31</div>
            </div>
            <div id="Garet" className="mate">
              <div className="hp">70</div>
              <div className="pp">25</div>
            </div>
            <div id="Ivan" className="mate">
              <div className="hp">83</div>
              <div className="pp">31</div>
            </div>
            <div id="Mary" className="mate">
              <div className="hp">83</div>
              <div className="pp">31</div>
            </div>
          </div>
          <div className="menu">
            <img
              id="Portrait"
              src="../assets/sprites/portrait.jpg"
              alt="Portrait"
            />
            <div id="Gap" />
            <div className="actions">{getMenu()}</div>
            <div className="menu-frame" id={menuPosition.context.id} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
