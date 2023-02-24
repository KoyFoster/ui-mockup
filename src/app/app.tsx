// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import './app.scss';

export function App() {
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
          <div id="Portrait">[Portrait]</div>

          <div id="Attack">[Attack]</div>
          <div id="Energy">[Energy]</div>
          <div id="Djinn">[Djinn]</div>
          <div id="Summon">[Summon]</div>
          <div id="Defend">[Defend]</div>

          <div id="Menu-Focused">
            <div>[Menu-Focused]</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
