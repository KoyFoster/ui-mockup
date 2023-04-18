interface Ability {
    name: string;
    desc: string;
    action: () => void;
};

/**
 * enabled: Whether or not the player has unlocked this Djinn or not
 * standBy: tracks wether or not the Djinn is in standby, and will set 'set' to true and itself back to -1 when it becomes 2
 * setTo: character that the Djinn is tied to
 */
interface Djinn {
    enabled: boolean;
    name: string;
    desc: string;
    ability: Ability;
    element: EnergyElement;
    standBy: -1 | 0 | 1 | 2;
    set: boolean;
    setTo: string;
}

interface Djinns {
    standby: Djinn[];
    set: Djinn[];
    jupiter: Djinn[];
    mars: Djinn[];
    mercury: Djinn[];
    venus: Djinn[];
}

/**
 * djinnRequirement: The minimum required Djinns that are not set or in standBy for the summon to become available.
 */
interface Summon {
    name: string;
    desc: string;
    djinnRequirement: number;
    ability: Ability;
}

interface Summons {
    jupiter: Summon[];
    mars: Summon[];
    mercury: Summon[];
    venus: Summon[];
}