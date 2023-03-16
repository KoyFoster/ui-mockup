import React from 'react';
import { SpriteController } from './assets/context';
import SoundController from './assets/sounds';
import Battle from './scenes/battle';

const Main = () => {
  return (
    <SoundController>
      <SpriteController>
        <Battle />
      </SpriteController>
    </SoundController>
  );
};

export default Main;
