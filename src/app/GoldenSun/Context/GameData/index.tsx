import { createContext, useReducer, useState } from 'react';

export const GameDataContext = createContext(
  {} as {
    djinns: {
      djinns: Djinns;
      summons: Summons;
    };
    setDjinnsState: React.Dispatch<{
      type: string;
      value: string | number;
    }>;
  }
);

const DEBUG = false;

/**
 * For the handling of Djinns and Summons
 */
const djinnsReducer = (
  state: { djinns: Djinns; summons: Summons },
  actions: { type: string; value: string | number }
) => {
  switch (actions.type) {
    // Move djinns states by given number of steps
    case 'progress': {
      const steps = actions.value as number;
      const { standby, set } = state.djinns;

      // iterate through all onStandby Djinns and move them into isSet when 2 or more turns have passed
      let i = 0;
      for (i; i < standby.length; i += 1) {
        const djinn = standby[i];
        djinn.standBy += steps;
        // Relocated to set
        if (djinn.standBy >= 2) {
          djinn.standBy = -1;
          djinn.set = true;
          set.splice(0, 0, ...standby.splice(i, 1));
          i--;
        }
      }
      return { ...state };
    }
    case 'summons': {
      // summon summon
      // consume needed djinns, setting them to standby, and their standby values to 0.
      break;
    }

    default:
      break;
  }

  return state;
};
const Djinns = () => {
  const [djinns, setDjinnsState] = useReducer(djinnsReducer, {
    djinns: {
      standby: [],
      set: [],
      jupiter: [],
      mars: [],
      mercury: [],
      venus: [
        {
          ability: {
            name: 'unknown',
            desc: 'unknown',
            action: () => {
              console.log('Nothing happened');
            },
          },
          desc: 'unknown',
          element: 'venus',
          enabled: true,
          name: 'Solo',
          set: false,
          setTo: 'Issac',
          standBy: -1,
        },
      ],
    },
    summons: {
      jupiter: [],
      mars: [],
      mercury: [],
      venus: [],
    },
  } as { djinns: Djinns; summons: Summons });

  return { djinns, setDjinnsState };
};

const GameData = ({ children }: { children: React.ReactNode }) => {
  const { djinns, setDjinnsState } = Djinns();

  return (
    <GameDataContext.Provider value={{ djinns, setDjinnsState }}>
      {children}
    </GameDataContext.Provider>
  );
};

export default GameData;