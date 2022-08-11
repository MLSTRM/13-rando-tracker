import { Bosses, Days } from "./constants";

export type EP = 5 | 6 | 7 | 8 | 9;
export type ItemSlots = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface RandoState {
    day: Days,
    ep: EP,
    recoveryItems: ItemSlots,
    epAbilities: bigint,
    bosses: {
        [key in Bosses]: {location: boolean, fight: boolean}
    },
    questState: {
        main: {},
        side: {},
        canvas: {}
    },
    keyItems: {
        [key: string]: number
    }
}

export const enum QuestState {
    UNAVAILABLE,
    AVAILABLE,
    STARTED_BLOCKED,
    STARTED_OPEN,
    COMPLETED,
    FAILED,
    MISSED
}

export * from './constants';
export * from './identifiers';