// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.scss';
import './app.scss';
import menuSheet from '../assets/sprites/Golden-Sun-Menu-Assets.png'

/* Globals */
interface MenuItem { label: string; map: [number, number, number, number]; sprite: string; };
const Menu = {
  keys: ['attack', 'energy', 'djinn', 'summon', 'items', 'defend'],
  attack: {
    label: 'Attack',
    map: [12, 134, 24, 24],
    sprite: ''
  },
  energy: {
    label: 'Energy',
    map: [36, 134, 24, 24],
    sprite: ''
  },
  djinn: {
    label: 'Djinn',
    map: [60, 134, 24, 24],
    sprite: ''
  },
  summon: {
    label: 'Summon',
    map: [84, 134, 24, 24],
    sprite: ''
  },
  items: {
    label: 'Items',
    map: [108, 134, 24, 24],
    sprite: ''
  },
  defend: {
    label: 'defend',
    map: [132, 134, 24, 24],
    sprite: ''
  },
} as {
  [key: string]: MenuItem | string[];
  keys: string[];
};

// const map: [12, 134, 2, 24];
function getSprite(map: [number, number, number, number]) {
  // const canvas = document.createElement('canvas');
  // canvas.width = 128;
  // canvas.height = 128;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const img = document.createElement('img');
  img.src = menuSheet;

  const ctx = canvas?.getContext("2d");
  ctx?.drawImage(img, map[0], map[1], map[2], map[3], 0, 0, 128, 128);
  const cache = canvas.toDataURL("image/png");

  return cache;
}

export function App() {
  const [selected, setSelected] = useState('');

  return (
    <div className="App">    
      <div className="team">
        <div id="Koy">
          <div>
            <div>Koy</div>
          </div>
        </div>
        <div id="Garet">
          <div>
            <div>Garet</div>
          </div>
        </div>
        <div id="Ivan">
          <div>
            <div>Ivan</div>
          </div>
        </div>
        <div id="Mary">
          <div>
            <div>Mary</div>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="options">
          <div id="Portrait" />
          <div id="Gap" />
          <div className="actions">
            {Menu.keys.map((key: string) => {
              const item = Menu[key] as MenuItem;
              const { label: action } = item;

              if(!item.sprite && item.map) item.sprite = getSprite(item.map);

              return (
                <div
                  className="menu-actions"
                  key={key}
                  id={selected === action ? 'active' : 'inactive'}
                  onMouseOver={() => {
                    console.log('action:', action);
                    setSelected(action);
                  }}
                >
                {item.sprite ? <img src={item.sprite} alt={action} /> : action}
                </div>
              );
            })}
          </div>
          <div id="Menu-Focused">
            <div>
              <div>{selected}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
