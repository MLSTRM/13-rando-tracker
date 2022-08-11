export interface RandoMemoryState {
    region: {
        map: string;
        zone: string;
        known?: boolean;
    };
    gil: number;
    keyItems: Map<string, number>;
    items: Map<string, number>;
    characters: Characters<CharacterData>;
}

export type Characters<T> = {
    Lightning: T;
    Sazh: T;
    Hope: T;
    Vanille: T;
    Fang: T;
    Snow: T;
}

export interface CharacterData {
    HP: number;
    Str: number;
    Mag: number;
    CP: number;
    RoleLevels: Roles<number>;
    Abilities?: string[];
}

export type Roles<T> = {
    COM: T,
    RAV: T,
    SEN: T,
    SAB: T,
    SYN: T,
    MED: T
}

// data type constants
export const BYTE = 'byte';
export const INT = 'int';
export const INT32 = 'int32';
export const UINT32 = 'uint32';
export const INT64 = 'int64';
export const UINT64 = 'uint64';
export const DWORD = 'dword';
export const SHORT = 'short';
export const LONG = 'long';
export const FLOAT = 'float';
export const DOUBLE = 'double';
export const BOOL = 'bool';
export const BOOLEAN = 'boolean';
export const PTR = 'ptr';
export const POINTER = 'pointer';
export const STR = 'str';
export const STRING = 'string';
export const VEC3 = 'vec3';
export const VECTOR3 = 'vector3';
export const VEC4 = 'vec4';
export const VECTOR4 = 'vector4';