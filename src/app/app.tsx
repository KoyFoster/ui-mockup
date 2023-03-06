// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
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
}

//
const Menu = {
  keys: ['fight', 'run', 'status'],
  loaded: false,
  fight: {
    id: 'fight',
    label: 'Fight',
    map: [12, 106, 24, 24],
    sprite: '',

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

export function App() {
  const [actionMenu, setActionMenu] = useState(cloneDeep(Menu));
  const [menuPosition, setMenuPosition] = useState({
    context: actionMenu,
    path: '',
  });
  const [loaded, setLoaded] = useState(false);

  const loadSprites = () => {
    const menu = menuPosition.context;
    if (!menu.isLoaded) {
      setLoaded(false);
      console.log('loading sprites');
      menu?.keys.forEach(async (key: string, i: number) => {
        const item = menu[key] as MenuItem;
        if (!item.sprite && item.map) item.sprite = await getSprite(item.map);

        if (i + 1 === menu.keys.length) {
          menu[key].isLoaded = true;
          setActionMenu(actionMenu);
          setLoaded(true);
          console.log('sprites loaded');
        }
      });
    }
    // Update State
  };

  useEffect(() => {
    loadSprites();
  }, [menuPosition?.context]);

  function getMenu() {
    return menuPosition.context?.keys.map((key: string) => {
      const item = menuPosition.context[key] as MenuItem;
      const { id: action } = item;

      // if(!item.sprite && item.map) item.sprite = await getSprite(item.map);

      return (
        <button
          type="button"
          className="menu-actions"
          key={key}
          // id={menuPosition[0] === action ? 'active' : 'inactive'}
          onClick={() => {
            // Enter menu context
            if (menuPosition.context[action].menu) {
              setMenuPosition({
                context: menuPosition.context[action].menu,
                path: '',
              });
            }
            // Run Behavior
            else {
              if (menuPosition.context[action].action)
                menuPosition.context[action].action();
              else console.log(`You tried to ${action}, but nothing happened.`);
            }
          }}
          draggable="false"
          data-tool-tip={`${action}`}
        >
          {!item.sprite || (
            <img src={item.sprite} alt={action} draggable="false" />
          )}
        </button>
      );
    });
  }

  return (
    <div className="App">
      {!loaded ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <>
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
