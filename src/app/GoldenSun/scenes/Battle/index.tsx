import { useContext, useEffect } from 'react';
import { SoundControllerContext } from '../../assets/sounds';
import BattleMenu from 'src/app/GoldenSun/menus/Encounter';
import BattleState from 'src/app/GoldenSun/menus/Encounter/Context/BattleState';
import Party from '../../Party';
import BackgroundScene from 'src/app/GoldenSun/assets/sprites/backgrounds/Suhalla_Gate.gif';
import './index.scss';
import BattleBackground from '../../BattleBackground';
import AvailableSummons from '../../AvailableSummons';

const Battle = () => {
  const sounds = useContext(SoundControllerContext);

  useEffect(() => {
    sounds.battleTheme.Play();
  }, []);

  return (
    <div className="gs-battle">
      <BattleBackground src={BackgroundScene} style={{position: 'absolute', left: 0, right: 0, top: '-8rem'}}/>
      <AvailableSummons/><Party />
      <BattleState>
        <BattleMenu />
      </BattleState>
    </div>
  );
};

export default Battle;
