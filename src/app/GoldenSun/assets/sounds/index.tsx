import MenuMove from '../../assets/sounds/fx/MenuMove.wav';
import MenuPositive from '../../assets/sounds/fx/MenuPositive.wav';
import MenuNegative from '../../assets/sounds/fx/MenuNegative.wav';
import BattleTheme from '../../assets/sounds/bg/battle-theme.mp3';
import { createContext, useEffect, useMemo } from 'react';
import VolumeSettings from './VolumeSettings';
import { DEFAULT_VOLUME_PROPS } from './constants';
import useVolumeData from './VolumeSettings/useVolumeData';

// TODO (2023-03-25): Refactor this whole thing
const useSoundControllerRefs = () => {
  const btRef = useMemo(() => new GameAudio(BattleTheme, 'BattleTheme'), []);
  // Menu FX
  const mmRef = useMemo(() => new GameAudio(MenuMove, 'MenuEffects'), []);
  const mpRef = useMemo(() => new GameAudio(MenuPositive, 'MenuPositive'), []);
  const mnRef = useMemo(() => new GameAudio(MenuNegative, 'MenuNegative'), []);

  return {
    battleTheme: btRef,
    menuMove: mmRef,
    menuPositive: mpRef,
    menuNegative: mnRef,
  };
};

class GameAudio extends Audio {
  private GAID = '0';
  constructor(src?: string | undefined, id?: string) {
    super(src);
    if (id) this.GAID = id;
  }
  /** Plays the audio from the start without waiting for it to finish. */
  Play() {
    this.currentTime = 0;
    this.play().catch((err) => console.error('Audio Error:', err));
  }
}

export const SoundControllerContext = createContext({
  battleTheme: null,
  menuMove: null,
  menuPositive: null,
  menuNegative: null,
} as Sounds);

const SoundController = ({
  children,
}: {
  children: React.ReactNode | string;
}) => {
  const soundController = useSoundControllerRefs();
  const { volume, handleChange } = useVolumeData();

  useEffect(() => {
    soundController.battleTheme.volume = volume.calls.getMusic();
    soundController.menuMove.volume = volume.calls.getMenuFX();
    soundController.menuNegative.volume = volume.calls.getMenuFX();
    soundController.menuPositive.volume = volume.calls.getMenuFX();
  }, [
    soundController.battleTheme,
    soundController.menuMove,
    soundController.menuNegative,
    soundController.menuPositive,
    volume,
  ]);

  return (
    <SoundControllerContext.Provider value={soundController}>
      <VolumeSettings
        volume={volume.properties}
        defaultVolume={DEFAULT_VOLUME_PROPS}
        onChange={handleChange}
      />
      {children}
    </SoundControllerContext.Provider>
  );
};

export default SoundController;
