import { BYTE, DWORD } from "memoryjs";
import { FF13MemoryReader } from "./memoryReader";
import { stripNullChars } from ".";
import { prettyPrintAbility } from '13-rando-core';

//CONFIG
const reader = new FF13MemoryReader(false);
const showItems = false;
const showAbilities = false;
const loop = false;

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
const cpOffset = 0xC80;
const rolebitsOffset = 0xC70;
const nameOffset = 0x30;
const abilityOffset = 0x40;
const hpOffset = cpOffset + 0x0C;
const strOffset = cpOffset + 0x1C;
const magOffset = cpOffset + 0x20;

//boss, change_dummy, ...

const interval = setInterval(async () => {
    try {
        if(!reader.isAttached()){
            console.log(`Attaching to process`);
            await reader.tryAttach();
            if(reader.isAttached()){
                //Resolve new verification hook...
                const pHeader = reader.readMemoryAddress(pGilRegionPointerMaybe, DWORD, true);
                const header = reader.readMemoryAddress(pHeader, DWORD, true);
                if(header === staticRegionVerify){
                    console.log(`Verified reader!`);
                } else {
                    console.log(`Verification header: ${header}`);
                }
            }
        } else {
            const pGlobalData = reader.readMemoryAddress(pGilRegionPointerMaybe, DWORD, true);
            console.log(`Global data region maybe around ${pGlobalData.toString(16)}`);
            console.log(`Gil: ${reader.readMemoryAddress(pGlobalData + pGilOffset, DWORD, true)}`);

            const pCharacterData = reader.readMemoryAddress(pCharacterDataStart, DWORD, true);
            console.log(`Reading start of character data table: ${pCharacterData.toString(16)}`);

            const pItemLocation = reader.readMemoryAddress(pItemTableBase, DWORD, true);
            console.log(`Reading pItemLocation as ${pItemLocation.toString(16)}`);
            const pItems = pItemLocation + 0x80;
            console.log(`item table start location: ${pItems.toString(16)}`);
            const pKeyItems = pItems + 0x4690;
            console.log(`key item table start location: ${pKeyItems.toString(16)}`);

            for(const [name, i] of characterTableIndicies.entries()){
                const characterLoc = pCharacterData + characterTableEntryLength*i;
                const characterName = reader.readBuffer(characterLoc + nameOffset, 16, true);
                console.log(`Character table entry for name ${name} at ${characterLoc.toString(16)} (${characterName})`);
                const characterCP = reader.readMemoryAddress(characterLoc + cpOffset, DWORD, true);
                const characterHP = reader.readMemoryAddress(characterLoc + hpOffset, DWORD, true);
                const characterStr = reader.readMemoryAddress(characterLoc + strOffset, DWORD, true);
                const characterMag = reader.readMemoryAddress(characterLoc + magOffset, DWORD, true);
                console.log(`Character stats: HP ${characterHP}, Str: ${characterStr}, Mag: ${characterMag}, cp: ${characterCP}`);
                const roles = [
                    `SEN: ${reader.readMemoryAddress(characterLoc + rolesOffset, DWORD, true)}`,
                    `COM: ${reader.readMemoryAddress(characterLoc + rolesOffset + 4, DWORD, true)}`,
                    `RAV: ${reader.readMemoryAddress(characterLoc + rolesOffset + 8, DWORD, true)}`,
                    `SYN: ${reader.readMemoryAddress(characterLoc + rolesOffset + 12, DWORD, true)}`,
                    `SAB: ${reader.readMemoryAddress(characterLoc + rolesOffset + 16, DWORD, true)}`,
                    `MED: ${reader.readMemoryAddress(characterLoc + rolesOffset + 20, DWORD, true)}`,
                ]
                console.log(`Role levels: ${roles}`);
                const roleBits = reader.readMemoryAddress(characterLoc + rolebitsOffset, BYTE, true);
                console.log(`Role bits: ${roleBits.toString(16)} - COM:${(roleBits & 2) !== 0}, RAV:${(roleBits & 4) !== 0}, SEN:${(roleBits & 1) !== 0},SYN:${(roleBits & 8) !== 0}, SAB:${(roleBits & 0x10) !== 0}, MED:${(roleBits & 0x20) !== 0}`);
                if(showAbilities){
                    const characterAbilities = [];
                    const unknownCharacterAbilities = [];
                    for(var j = 0; j < 80; j++){
                        const ability = reader.readBuffer(characterLoc + abilityOffset + 0x10*j, 16, true);
                        const stripped = stripNullChars(ability);
                        if(!stripped){
                            break;
                        }
                        const pretty = prettyPrintAbility(stripped);
                        if(pretty.known){
                            characterAbilities.push(pretty.name);
                        } else {
                            unknownCharacterAbilities.push(pretty.name);
                        }
                    }
                    console.log(`Resolved Character abilities: ${characterAbilities}`);
                    console.log(`Unresolved ability count: ${unknownCharacterAbilities.length} - ${unknownCharacterAbilities}`);
                }
            }

            if(showItems){
                console.log('Key item info');
                // 299 key item slots?!?
                for(var i = 0; i<100; i++){
                    //can early exit if item is empty
                    //This still has 16 length even though it shows nothing. Unprinting null chars??
                    const item = reader.readBuffer(pKeyItems + (keyItemLength*i), 16, true)?.toString();
                    const count = reader.readMemoryAddress(pKeyItems + (keyItemLength*i) + keyItemAmountOffset, BYTE, true);
                    if(count > 0){
                        console.log(`Key item ${i}: "${item}" - count ${count}`);
                    } else {
                        break;
                    }
                }
                console.log('item info');
                // Only 99 item slots?
                for(var i = 0; i<50; i++){
                    const item = reader.readBuffer(pItems + (keyItemLength*i), 16, true)?.toString();
                    const count = reader.readMemoryAddress(pItems + (keyItemLength*i) + keyItemAmountOffset, BYTE, true);
                    if(count > 0){
                        console.log(`item ${i}: "${item}" - count ${count}`);
                    } else {
                        break;
                    }
                }
            }

            if(!loop){
                reader.detatch();
                clearInterval(interval);
            }
        }
    } catch (err){
        console.log(`error: ${err}`);
        clearInterval(interval);
    }
}, 2000);

// Things to find
// Role unlock vs role level 0?