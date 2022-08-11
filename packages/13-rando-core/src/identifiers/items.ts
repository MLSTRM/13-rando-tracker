export type Item = keyof typeof itemNameMap;

export const itemNameMap = Object.freeze({
    'it_potion': 'Potion',
    'it_phenxtal': 'Phoenix Down',
    'it_tpsmoke': 'Ethersol',
    'it_libra': 'Librascope',
    'it_sneaksmoke': 'Deceptisol',
    'it_barsmoke': 'Aegisol',
    'it_powersmoke': 'Fortisol',
    'it_holywater': 'Holy Water',
    'it_antidote': 'Antidote'
});

function isValidItem(name: string): name is Item {
    return itemNameMap.hasOwnProperty(name);
}

export function prettyPrintItem(item: string): { known: boolean, name: string } {
    if (!item) {
        return { known: false, name: '' };
    }
    if (isValidItem(item)) {
        return { known: true, name:itemNameMap[item] };
    }
    return { known: false, name: item };
}