// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.scss';
import './app.scss';
import menuSheet from '../assets/sprites/Golden-Sun-Menu-Assets.png';

/* Globals */
interface MenuItem {
  label: string;
  map: [number, number, number, number];
  sprite: string;
}
const Menu = {
  keys: ['attack', 'energy', 'djinn', 'summon', 'items', 'defend'],
  attack: {
    label: 'Attack',
    map: [12, 134, 24, 24],
    sprite: '',
  },
  energy: {
    label: 'Energy',
    map: [36, 134, 24, 24],
    sprite: '',
  },
  djinn: {
    label: 'Djinn',
    map: [60, 134, 24, 24],
    sprite: '',
  },
  summon: {
    label: 'Summon',
    map: [84, 134, 24, 24],
    sprite: '',
  },
  items: {
    label: 'Items',
    map: [108, 134, 24, 24],
    sprite: '',
  },
  defend: {
    label: 'Defend',
    map: [132, 134, 24, 24],
    sprite: '',
  },
} as {
  [key: string]: MenuItem | string[];
  keys: string[];
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

const loadSprites = async () => {
  await Menu.keys.forEach(async (key: string) => {
    const item = Menu[key] as MenuItem;
    if (!item.sprite && item.map) item.sprite = await getSprite(item.map);
  });
};

export function App() {
  const [selected, setSelected] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSprites().then(() => {
      setLoaded(true);
    });
  }, []);

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
              <img id="Portrait" src='../assets/sprites/portrait.jpg' alt='Portrait' />
              <div id="Gap" />
              <div className="actions">
                {Menu.keys.map((key: string) => {
                  const item = Menu[key] as MenuItem;
                  const { label: action } = item;

                  // if(!item.sprite && item.map) item.sprite = await getSprite(item.map);

                  return (
                    <button
                      type="button"
                      className="menu-actions"
                      key={key}
                      id={selected === action ? 'active' : 'inactive'}
                      onClick={() => {
                        setSelected(action);
                      }}
                      draggable="false"
                      data-tool-tip={`${action}`}
                    >
                      {!item.sprite || (
                        <img src={item.sprite} alt={action} draggable="false" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="menu-frame" id={selected} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
