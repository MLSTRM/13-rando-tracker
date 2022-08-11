import { BYTE, Characters, DWORD, SHORT } from "./model";
import { FF13MemoryReader, RandoMemoryState, CharacterData } from ".";


//should stop at first null char.
export function stripNullChars(input: Buffer, stopAtFirstNull = false): string {
    const str = input.toString('utf-8');
    const trimmed = stopAtFirstNull ? str.substr(0, str.indexOf('\0\0')) : str;
    const stripped = trimmed.replace(/\0/g, '');
    return stripped;
}

//Info
const keyItemLength = 24;
const keyItemAmountOffset = 0x10;

const pGilRegionPointerMaybe = 0x02802F94;
//Plus a whole bunch holy shit
const pGilOffset = 0x1BFC;
//+0x45
//11A54B28 - 11A52F2C
const staticRegionVerify = 0x025BDD5C;

const pItemTableBase = 0x0281E230;
const pCharacterDataStart = 0x02802C58;
const characterTableEntryLength = 0xf30;
//16 text, 4 count, 4 marker
const characterTableIndicies = new Map([['fang',9],['hope',11],['light',13],['sazh',14],['snow',16],['vanille',17]]);
const rolesOffset = 0xC40;
const rolebitsOffset = 0xC70;
const cpOffset = 0xC80;
const nameOffset = 0x30;
const abilityOffset = 0x40;
const hpOffset = cpOffset + 0x0C;
const strOffset = cpOffset + 0x1C;
const magOffset = cpOffset + 0x20;

export async function attachAndVerify(reader: FF13MemoryReader): Promise<boolean> {
    try {
        if(!reader.isAttached()){
            await reader.tryAttach();
            if(!reader.isAttached()){
                console.log('Process attachment failed');
                return false;
            }
        }
        const pHeader = reader.readMemoryAddress(pGilRegionPointerMaybe, DWORD, true);
        const header = reader.readMemoryAddress(pHeader, DWORD, true);
        if(header === staticRegionVerify){
            console.log(`Verified reader!`);
            return true;
        }
        console.log('Unable to verify process information');
    } catch (err){
        console.error(`Error while attaching to process: ${err}`);
    }
    return false;
}

export function scrapeRandoState(reader: FF13MemoryReader): RandoMemoryState {
    //Rework all memory locations and add to state
    const pGlobalData = reader.readMemoryAddress(pGilRegionPointerMaybe, DWORD, true);
    const gil = reader.readMemoryAddress(pGlobalData + pGilOffset, DWORD, true);
    const pCharacterData = reader.readMemoryAddress(pCharacterDataStart, DWORD, true);
    
    const pItemLocation = reader.readMemoryAddress(pItemTableBase, DWORD, true);
    const pItems = pItemLocation + 0x80;
    const pKeyItems = pItems + 0x4690;
    return {
        gil,
        items: generateItemMap(reader, pItems),
        keyItems: generateItemMap(reader, pKeyItems),
        region: {
            map: '',
            zone: ''
        },
        characters: {
            Fang: resolveCharacterData(reader, pCharacterData, 9),
            Hope: resolveCharacterData(reader, pCharacterData, 11),
            Lightning: resolveCharacterData(reader, pCharacterData, 13),
            Sazh: resolveCharacterData(reader, pCharacterData, 14),
            Snow: resolveCharacterData(reader, pCharacterData, 16),
            Vanille: resolveCharacterData(reader, pCharacterData, 17)
        }
    };
}

function checkRoleAvailable(reader: FF13MemoryReader, rolebits: number, bitToCheck: number, offset: number) {
    const hasRole = (rolebits & bitToCheck) !== 0;
    return hasRole ? reader.readMemoryAddress(offset, DWORD, true) : -1;
}

function resolveCharacterData(reader: FF13MemoryReader, base: number, charIndex: number): CharacterData {
    const characterLoc = base + characterTableEntryLength*charIndex;
    const CP = reader.readMemoryAddress(characterLoc + cpOffset, DWORD, true);
    const HP = reader.readMemoryAddress(characterLoc + hpOffset, DWORD, true);
    const Str = reader.readMemoryAddress(characterLoc + strOffset, DWORD, true);
    const Mag = reader.readMemoryAddress(characterLoc + magOffset, DWORD, true);
    const roleBits = reader.readMemoryAddress(characterLoc + rolebitsOffset, BYTE, true);

    const roles = {
        SEN: checkRoleAvailable(reader, roleBits, 1, characterLoc + rolesOffset),
        COM: checkRoleAvailable(reader, roleBits, 2, characterLoc + rolesOffset + 4),
        RAV: checkRoleAvailable(reader, roleBits, 4, characterLoc + rolesOffset + 8),
        SYN: checkRoleAvailable(reader, roleBits, 8, characterLoc + rolesOffset + 12),
        SAB: checkRoleAvailable(reader, roleBits, 16, characterLoc + rolesOffset + 16),
        MED: checkRoleAvailable(reader, roleBits, 32, characterLoc + rolesOffset + 20),
    };
    return {
        CP,
        HP,
        Mag,
        Str,
        RoleLevels: roles
    };
}

// Works for any inventory type (based on LR logic)
function generateItemMap(reader: FF13MemoryReader, base: number): Map<string, number> {
    const maxItems = 50; //todo make this reflect the bag? Where are the headers for 13?
    const map: Map<string, number> = new Map();
    for(var i = 0; i<maxItems; i++){
        const item = stripNullChars(reader.readBuffer(base + (keyItemLength*i), 16, true));
        const count = reader.readMemoryAddress(base + (keyItemLength*i) + keyItemAmountOffset, BYTE, true);
        if(item.length > 0 && count > 0){
            map.set(item, count);
        }
    }
    // console.log('Reached end of iteration, might be some missing items at the end');
    return map;
}

function resolveCharaCounter(reader: FF13MemoryReader, base: number, index: number): number {
    /*
    LRFF13.exe+5BEFDE - 8B 15 2C25DA02        - mov edx,[LRFF13.exe+20D252C] { (DEA682A0) }
    LRFF13.exe+5BEFE4 - 8D 0C C0              - lea ecx,[eax+eax*8] {multiply index by 9}
    LRFF13.exe+5BEFE7 - 03 C9                 - add ecx,ecx {then double}
    LRFF13.exe+5BEFE9 - 8D 84 CA C82C0500     - lea eax,[edx+ecx*8+00052CC8] {then multiply by 8, add offset}
    LRFF13.exe+5BEFF0 - 85 C0                 - test eax,eax
    LRFF13.exe+5BEFF2 - 74 32                 - je LRFF13.exe+5BF026 {unsure whats happening here}
    LRFF13.exe+5BEFF4 - 66 89 5C 70 30        - mov [eax+esi*2+30],bx {read value with esi offset and base offset of 0x30}
    esi always seems to be 0 but is likely the second arg to sfGetCharaCounter
    */
    const baseCharaCounterOffset = 0x52CC8;
    const pSoulSeed = base + baseCharaCounterOffset + index * 18*8 + 0x30;
    const counterValue = reader.readMemoryAddress(pSoulSeed, SHORT, true);
    return counterValue;
}