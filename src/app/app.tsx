// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.scss';
import './app.scss';
import menuSheet from '../assets/sprites/Golden-Sun-Menu-Assets.png'

/* Globals */
const Menu = {
  keys: ['attack', 'energy', 'djinn', 'summon', 'items', 'defend'],
  attack: {
    label: 'Attack',
    icon: '../assets/sprites/attack.jpg',
  },
  energy: {
    label: 'Energy',
    icon: '',
  },
  djinn: {
    label: 'Djinn',
    icon: '../assets/sprites/djinn.jpg',
  },
  summon: {
    label: 'Summon',
    icon: '../assets/sprites/summon.jpg',
  },
  items: {
    label: 'Items',
    icon: '../assets/sprites/items.jpg',
  },
  defend: {
    label: 'defend',
    icon: '../assets/sprites/defend.jpg',
  },
} as {
  [key: string]: { label: string; icon: string } | string[];
  keys: string[];
};

// const map: [12, 134, 24, 24];
// function getSprite(map: [number,number,number,number]) {
//   const canvas = document.createElement('canvas');
//   var ctx = canvas?.getContext("2d");
//   ctx?.drawImage(menuSheet, 10, 10);

//   return result;
// }


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
              const { label: action, icon } = Menu[key] as {
                label: string;
                icon: string;
              };
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
                  {icon ? <img src={icon} alt={action} /> : action}
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
