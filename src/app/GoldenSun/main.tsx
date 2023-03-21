import React from 'react';
import { SpriteController } from './assets/context';
import SoundController from './assets/sounds';
import Battle from './scenes/Battle';
import './index.scss';

const Main = () => {
  return (
    <div className='golden-sun'>
      <SoundController>
        <SpriteController>
          <Battle />
        </SpriteController>
      </SoundController>
    </div>
  );
};

export default Main;
