import MenuMove from '../../assets/sounds/fx/MenuMove.wav';
import MenuPositive from '../../assets/sounds/fx/MenuPositive.wav';
import MenuNegative from '../../assets/sounds/fx/MenuNegative.wav';
import BattleTheme from '../../assets/sounds/bg/battle-theme.mp3';
import { createContext, useEffect, useMemo, useState } from 'react';
import VolumeSettings from './VolumeSettings';

// TODO (2023-03-25): Refactor this whole thing

// VOLUME
const DEFAULT_VOLUME_PROPS = Object.freeze({
  master: { key: 'master', label: 'Master', value: 0.5 },
  music: { key: 'music', label: 'Music', value: 0.5 },
  generalFX: { key: 'generalFX', label: 'General Sound Effects', value: 0.5 },
  menuFX: { key: 'menuFX', label: 'Menu Sound Effects', value: 0.5 },
  battleFX: { key: 'battleFX', label: 'Battle Sound Effects', value: 0.5 },
});
const VOLUME: Volume = {
  properties: {
    master: { key: 'master', label: 'Master', value: 0.5 },
    music: { key: 'music', label: 'Music', value: 0.5 },
    generalFX: { key: 'generalFX', label: 'General Sound Effects', value: 0.5 },
    menuFX: { key: 'menuFX', label: 'Menu Sound Effects', value: 0.5 },
    battleFX: { key: 'battleFX', label: 'Battle Sound Effects', value: 0.5 },
  },
  calls: {
    props: undefined,
    getMusic: function (this) {
      if (!this.props) return 0.5;
      return this.props?.master.value * this.props?.music.value;
    },
    getGeneralFX: function (this) {
      if (!this.props) return 0.5;
      return this.props.master.value * this.props.generalFX.value;
    },
    getMenuFX: function (this) {
      if (!this.props) return 0.5;
      return this.props.master.value * this.props.menuFX.value;
    },
  },
};
VOLUME.calls.props = VOLUME.properties;

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
  const [volume, setVolume] = useState({ ...VOLUME });

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
        onChange={(newVol, newVolProps) => {
          setVolume((v) => {
            if (newVol) v.properties[newVol.key].value = newVol.value;
            else if (newVolProps) {
              Object.keys(v.properties).forEach((key) => {
                v.properties[key] = newVolProps[key];
              });
            }

            return {...v};
          });
        }}
      />
      {children}
    </SoundControllerContext.Provider>
  );
};

export default SoundController;
