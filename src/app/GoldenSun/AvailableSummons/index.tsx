import { useContext } from 'react';
import { getElement } from '../components/Menu/DjinnActionMenuItem';
import { GameDataContext } from '../Context/GameData';
import { BattleStateContext } from '../menus/Encounter/Context/BattleState';
import './index.scss';

/** Displays the number of available summons by type */
const AvailableSummons = ({ className }: { className?: string }) => {
  const { djinns } = useContext(GameDataContext);

  return (
    <div
      className={
        'menu-frame available-summons' + (className ? ` ${className}` : '')
      }
    >
      <div className="element">
        <img src={getElement('venus')} alt="Venus" />
        {djinns.djinns.venus.length}
      </div>
      <div className="element">
        <img src={getElement('mercury')} alt="Mercury" />
        {djinns.djinns.mercury.length}
      </div>
      <div className="element">
        <img src={getElement('mars')} alt="Mars" />
        {djinns.djinns.mars.length}
      </div>
      <div className="element">
        <img src={getElement('jupiter')} alt="jupiter" />
        {djinns.djinns.jupiter.length}
      </div>
    </div>
  );
};

export default AvailableSummons;
