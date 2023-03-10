import MenuMove from '../../assets/sounds/fx/MenuMove.wav';
import MenuPositive from '../../assets/sounds/fx/MenuPositive.wav';
import MenuNegative from '../../assets/sounds/fx/MenuNegative.wav';
import BattleTheme from '../../assets/sounds/bg/battle-theme.mp3';
import { useRef } from 'react';

class GameAudio extends Audio {
    /** Plays the audio from the start without waiting for it to finish. */
    Play() {
        this.currentTime = 0;
        this.play();
    }
}

const SoundController = () => {
  const btRef = useRef(new GameAudio(BattleTheme));
  const mmRef = useRef(new GameAudio(MenuMove));
  const mpRef = useRef(new GameAudio(MenuPositive));
  const mnRef = useRef(new GameAudio(MenuNegative));

  return {
    battleTheme: btRef.current,
    menuMove: mmRef.current,
    menuPositive: mpRef.current,
    menuNagtive: mnRef.current,
  };
};

export default SoundController;