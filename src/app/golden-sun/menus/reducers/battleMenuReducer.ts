function last(history: BattleMenuStates[]) {
  if (!history.length) return null;
  return history[history.length];
}

const battleMenuReducer = (
  state: BattleMenuState,
  action: BattleMenuAction
): BattleMenuState => {
  console.log('battleMenuReducer:', 'State:', state, 'Action:', action);
  switch (action.type) {
    case 'GOTO': {
      if (action.menu === state.menu || !action.menu) break;

      const newHistory = [...state.history];
      if (last(newHistory) === action.menu) newHistory.pop();
      newHistory.push(state.menu);

      return { menu: action.menu, history: newHistory };
    }
    case 'RETURN': {
      if (!state.history.length) break;
      const newHistory = [...state.history];
      const prev = newHistory.pop();
      if (prev) return { menu: prev, history: newHistory };
      break;
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

  return state;
};

export default battleMenuReducer;
