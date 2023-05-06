import React from 'react';
import { SpriteController } from './assets/context';
import SoundController from './assets/sounds';
import Battle from './scenes/Battle';
import './index.scss';
import GameData from './Context/GameData';

const Main = () => {
  return (
    <div className="golden-sun">
      <SoundController>
        <SpriteController>
          <GameData>
            <Battle />
          </GameData>
        </SpriteController>
      </SoundController>
    </div>
  );
};

export default Main;
