import { useContext, useEffect } from 'react';
import { SoundControllerContext } from '../../assets/sounds';
import BattleMenu from '../../menus/encounter';
import BattleState from '../../menus/encounter/context/battle-state';
import Party from '../../party';
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
