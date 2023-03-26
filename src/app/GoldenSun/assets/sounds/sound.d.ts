declare module '*.wav' {
  const value: string;
  export default value;
}

declare module '*.mp3' {
  const value: string;
  export default value;
}

interface Sounds {
  battleTheme: GameAudio;
  menuMove: GameAudio;
  menuPositive: GameAudio;
  menuNegative: GameAudio;
}

interface VolumeProperties {
  [index: string]: VolumeValue;
}

interface VolumeCalls {
  props?: VolumeProperties;
  getMusic: () => number;
  getGeneralFX: () => number;
  getMenuFX: () => number;
}

interface Volume {
  properties: VolumeProperties;
  calls: VolumeCalls;
}