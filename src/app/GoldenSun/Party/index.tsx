import { useContext } from 'react';
import { GameDataContext } from '../Context/GameData';
import './index.scss';
import Mate from './mate';

const Party = () => {
  const { party } = useContext(GameDataContext);

  return (
    <div className="menu-frame team">
      {party?.map((m) => {
        return <Mate id={m.name} hp={m.hp.cur} pp={m.pp.cur} />;
      })}
    </div>
  );
};

export default Party;
