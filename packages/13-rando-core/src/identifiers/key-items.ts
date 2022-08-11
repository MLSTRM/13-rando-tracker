export type KeyItem = keyof typeof keyItemNameMap;

export const keyItemNameMap = Object.freeze({
    'chap_prog_01': 'Chapter 1 Progress',
    'chap_comp_01': 'Chapter 1 Complete',
    'chap_prog_02': 'Chapter 2 Progress',
    'chap_comp_02': 'Chapter 2 Complete',
    'chap_prog_03': 'Chapter 3 Progress',
    'chap_comp_03': 'Chapter 3 Complete',
    'chap_prog_04': 'Chapter 4 Progress',
    'chap_comp_04': 'Chapter 4 Complete',
    'chap_prog_05': 'Chapter 5 Progress',
    'chap_comp_05': 'Chapter 5 Complete',
    'chap_prog_06': 'Chapter 6 Progress',
    'chap_comp_06': 'Chapter 6 Complete',
    'chap_prog_07': 'Chapter 7 Progress',
    'chap_comp_07': 'Chapter 7 Complete',
    'chap_prog_08': 'Chapter 8 Progress',
    'chap_comp_08': 'Chapter 8 Complete',
    'chap_prog_09': 'Chapter 9 Progress',
    'chap_comp_09': 'Chapter 9 Complete',
    'chap_prog_10': 'Chapter 10 Progress',
    'chap_comp_10': 'Chapter 10 Complete',
    'chap_prog_11': 'Chapter 11 Progress',
    'chap_comp_11': 'Chapter 11 Complete',
    'chap_prog_12': 'Chapter 12 Progress',
    'chap_comp_12': 'Chapter 12 Complete',
    'chap_prog_13': 'Chapter 13 Progress',
    'chap_comp_13': 'Chapter 13 Complete',

    'cry_stage': 'Crystarium Expansion',

    'key_c_bryn': 'Brynhildr Eidolith',
    'key_c_baha': 'Bahamut Eidolith',
    'key_c_shiva': 'Shiva Eidolith',
    'key_c_odin': 'Odin Eidolith',
    'key_c_alexa': 'Alexander Eidolith',
    'key_c_hecat': 'Hecatoncheir Eidolith',

    'key_shop_00': 'Unicorn Mart',
    'key_shop_01': 'Eden Pharmaceuticals',
    'key_shop_02': 'Up In Arms',
    'key_shop_03': 'Platus\'s Workshop',
    'key_shop_04': '??UNKNOWN SHOP??',
    'key_shop_05': 'Gilgamesh, Inc.',
    'key_shop_06': 'B&W Outfitters',
    'key_shop_07': 'Magical Moments',
    'key_shop_08': 'Moogleworks',
    'key_shop_09': 'Sanctum Labs',
    'key_shop_10': 'Creature Comforts',
    'key_shop_11': 'The Motherlode',
    'key_shop_12': 'Lenora\'s Garage',
    'key_shop_13': 'R&D Depot',

    'key_field_00': 'Gysahl Reins',
    'key_receiver': 'Datalog',
    'key_ctool': 'Omni-kit',
    'key_tears': 'Serah\' Tear',
    'key_knife': 'Survival Knife'
});

function isValidKeyItem(name: string): name is KeyItem {
    return keyItemNameMap.hasOwnProperty(name);
}

export function prettyPrintKeyItem(item: string): { known: boolean, name: string } {
    if (!item) {
        return { known: false, name: '' };
    }
    if (isValidKeyItem(item)) {
        return { known: true, name: keyItemNameMap[item] };
    }
    return { known: false, name: item };
}