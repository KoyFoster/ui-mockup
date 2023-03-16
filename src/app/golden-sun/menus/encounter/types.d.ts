type BattleMenuStates =
  | 'decision'
  | 'fight'
  | 'run'
  | 'status'
  | 'attack'
  | 'energy'
  | 'summon'
  | 'desummon'
  | 'items'
  | 'defend'
  | 'confirm-target';

interface BattleStateProps {
  menuState: BattleMenuStates;
  setMenuState: React.Dispatch<React.SetStateAction<BattleMenuStates>>;
  menuReturn: () => void;
  menuGoTo: (screen: BattleMenuStates) => void;
}

/* TODO: Hardcoding string type for now. */
interface BattleMenus {
  [key: BattleMenuStates | string]: JSX.Element;
}