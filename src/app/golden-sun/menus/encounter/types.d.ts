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
  | 'confirm-target';

interface BattleStateProps {
  menuState: BattleMenuStates;
  setMenuState: React.Dispatch<React.SetStateAction<BattleMenuStates>>;
}

/* TODO: Hardcoding string type for now. */
interface BattleMenus {
  [key: BattleMenuStates | string]: JSX.Element;
}