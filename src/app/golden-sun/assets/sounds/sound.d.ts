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
  menuNagtive: GameAudio;
}