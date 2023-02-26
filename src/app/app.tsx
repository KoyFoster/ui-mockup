// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.scss';
import './app.scss';

/* Globals */
const Menu = {
  keys: ['attack', 'energy', 'djinn', 'summon', 'defend'],
  attack: 'Attack',
  energy: 'Energy',
  djinn: 'Djinn',
  summon: 'Summon',
  defend: 'Defend',
} as {
  [key: string]: string | string[];
  keys: string[];
};

export function App() {
  const [selected, setSelected] = useState('');

  return (
    <div className="App">
      <div className="team">
        <div id="Koy">
          <div>Koy</div>
        </div>
        <div id="Garet">
          <div>Garet</div>
        </div>
        <div id="Ivan">
          <div>Ivan</div>
        </div>
        <div id="Mary">
          <div>Mary</div>
        </div>
      </div>
      <div className="menu">
        <div className="options">
          <div id="Portrait" />
          <div id="Gap"/>
          <div className='actions'>
          {Menu.keys.map((key: string) => {
            const action = Menu[key] as string;
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
                {action}
              </div>
            );
          })}</div>

          <div id="Menu-Focused">
            <div id="Selection">{selected}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
