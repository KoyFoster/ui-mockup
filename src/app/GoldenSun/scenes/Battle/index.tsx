import { useContext, useEffect } from 'react';
import { SoundControllerContext } from '../../assets/sounds';
import BattleMenu from 'src/app/GoldenSun/menus/Encounter';
import BattleState from 'src/app/GoldenSun/menus/Encounter/Context/BattleState';
import Party from '../../Party';
import './index.scss';

// TODO (2023-03-06 17:40:33): Refactor menu code

const Battle = () => {
  const sounds = useContext(SoundControllerContext);

  useEffect(() => {
    sounds.battleTheme.volume = 0.1;
    sounds.battleTheme.Play();
  }, []);

  return (
    <div className="gs-battle">
      <Party />
      <BattleState>
        <BattleMenu />
      </BattleState>
    </div>
  );
};

export default Battle;
