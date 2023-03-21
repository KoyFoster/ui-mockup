interface BattleMenuState {
    menu: BattleMenuStates;
    history: BattleMenuStates[];
  }
  
  type ActionTypes = 'GOTO' | 'RETURN';
  type BattleMenuAction = { menu?: BattleMenuStates; type: ActionTypes };