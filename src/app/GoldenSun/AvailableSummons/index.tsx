import { useContext } from 'react';
import { getElement } from '../components/Menu/DjinnActionMenuItem';
import { BattleStateContext } from '../menus/Encounter/Context/BattleState';
import './index.scss';

/** Displays the number of available summons by type */
const AvailableSummons = ({ className }: { className?: string; }) => {
  return (
    <div className="menu-frame available-summons">
      <div className="element">
        <img src={getElement('venus')} alt="Venus" />0
      </div>
      <div className="element">
        <img src={getElement('mercury')} alt="Mercury" />0
      </div>
      <div className="element">
        <img src={getElement('mars')} alt="Mars" />0
      </div>
      <div className="element">
        <img src={getElement('jupiter')} alt="jupiter" />0
      </div>
    </div>
  );
};

export default AvailableSummons;
