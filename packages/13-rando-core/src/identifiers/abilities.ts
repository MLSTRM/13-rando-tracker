export type Ability = keyof typeof abilityNameMap;

//Fill this in from spreadsheet research then grab a plat/equivalent save and fill in the rest of the missing ones probably
export const abilityNameMap = Object.freeze({
    //Passives
    'aat500_00': 'Launch',
    'aat530_00': 'Ravage',
    'ac003_at530_00': 'Ravage (Hope)',
    'aat540_00': 'Blindside',
    'ac004_at540_00': 'Blindside (Vanille)',
    'aat550_00': 'Powerchain',
    'aat560_00': 'Smite',
    'aat570_00': 'Scourge',
    'ac003_at570_00': 'Scourge (Hope)',
    'ac004_at570_00': 'Scourge (vanille)',
    'ade010_00': 'Evade',
    'ade110_00': 'Counter',
    'ade600_00': 'Deathward',
    'ade610_00': 'Fringeward',
    'ade620_00': 'Reprieve',
    'ade700_00': 'Jeopardize',
    'ade710_00': 'Deathblow',
    'ade720_00': 'Lifesiphon',
    'ade730_00': 'Faultsiphon',
    'ade740_00': 'Adrenaline',
    'ade800_00': 'Fearsiphon',
    'ade810_00': 'Overwhelm',
    'ade820_00': 'Vigor',
    'ade850_00': 'Boon',
    'ade900_00': 'Jinx',
    //Commando
    'at010_00': 'Attack',
    'c000_at010_00': 'Attack (Lightning)',
    'c002_at010_00': 'Attack (Sazh)',
    'c003_at010_00': 'Attack (Hope)',
    'c004_at010_00': 'Attack (Vanille)',
    'ma000_00': 'Ruin',
    'ma020_00': 'Ruinga',
    'at520_00': 'Blitz',
    'c002_at520_00': 'Blitz (Sazh)',
    'c003_at520_00': 'Blitz (Hope)',
    //Ravager
    'mb000_00': 'Fire',
    'mb010_00': 'Fira',
    'mb020_00': 'Firaga',
    'mb100_00': 'Blizzard',
    'mb110_00': 'Blizzara',
    'mb120_00': 'Blizzaga',
    'mb200_00': 'Thunder',
    'mb210_00': 'Thundara',
    'mb220_00': 'Thundaga',
    'mb300_00': 'Water',
    'mb310_00': 'Watera',
    'mb320_00': 'Waterga',
    'mb400_00': 'Aero',
    'mb410_00': 'Aerora',
    'mb420_00': 'Aeroga',
    'at010_10': 'Flamestrike',
    'at010_20': 'Froststrike',
    'at010_30': 'Sparkstrike',
    'at010_40': 'Aquastrike',
    'c002_at010_10': 'Flamestrike (Sazh)',
    'c002_at010_20': 'Froststrike (Sazh)',
    'c002_at010_30': 'Sparkstrike (Sazh)',
    'c002_at010_40': 'Aquastrike (Sazh)',
    //Sentinel
    'ac100_00': 'Provoke',
    'ac110_00': 'Challenge',
    'gd010_00': 'Steelguard',
    'gd110_00': 'Mediguard',
    'gd210_00': 'Elude',
    'gd310_00': 'Vendetta',
    'c002_gd310_00': 'Vendetta (Sazh)',
    'c003_gd310_00': 'Vendetta (Hope)',
    'gd410_00': 'Entrench',
    'c003_gd410_00': 'Entrench (Hope)',
    'c004_gd410_00': 'Entrench (Vanille)',
    //Saboteur
    'mg000_00': 'Deprotect',
    'mg010_00': 'Deshell',
    'mg020_00': 'Posion',
    'mg030_00': 'Imperil',
    'mg200_00': 'Deprotega',
    'mg210_00': 'Deshellga',
    'mg220_00': 'Poisonga',
    'mg230_00': 'Imperilga',
    'mg240_00': 'Dispel',
    'mg500_00': 'slow/curse/daze', 
    'mg510_00': 'Fog',
    'mg520_00': 'Pain',
    'mg530_00': 'slow/curse/daze',
    'mg540_00': 'slow/curse/daze',
    'mg700_00': 'slowga/cursega/dazega', 
    'mg710_00': 'Fogga',
    'mg720_00': 'Painga',
    'mg730_00': 'slowga/cursega/dazega',
    'mg740_00': 'slowga/cursega/dazega',
    //Synergist
    'me000_00': 'Bravery',
    'me010_00': 'Faith',
    'me020_00': 'Haste',
    'me030_00': 'Enfire',
    'me040_00': 'Enfrost',
    'me050_00': 'Enthunder',
    'me060_00': 'Enwater',
    'me070_00': 'Vigilance',
    'me200_00': 'Bravera',
    'me210_00': 'Faithra',
    'me500_00': 'Protect',
    'me510_00': 'Shell',
    'me520_00': 'Veil',
    'me530_00': 'Barfire',
    'me540_00': 'Barfrost',
    'me550_00': 'Barthunder',
    'me560_00': 'Barwater',
    'me700_00': 'Protectra',
    'me710_00': 'Shellra',
    //Medic
    'mw000_00': 'Cure',
    'mw010_00': 'Cura',
    'mw020_00': 'Curaga',
    'mw030_00': 'Curaja',
    'mw100_00': 'Raise',
    'mw200_00': 'Esuna',
    //TP
    'sm000': 'Summon',
    'tp000_00': 'Renew',
    'tp100_00': 'Libra',
    'tp200_00': 'Stopga/dispelga',
    'tp300_00': 'Dispelga/stopga',
    'tp400_00': 'Quake',
    //Limit breaks
    'c000_at900_00': 'Army of One',
    'c001_at900_00': 'Soverign Fist',
    'c002_at900_00': 'Cold Blood',
    'c005_at900_00': 'Highwind',
    'ms200_00': 'Last Resort',
    'ms400_00': 'Death'
});

function isValidAbility(name: string): name is Ability {
    return abilityNameMap.hasOwnProperty(name);
}

export function prettyPrintAbility(item: string): { known: boolean, name: string } {
    if (!item) {
        return { known: false, name: '' };
    }
    if (isValidAbility(item)) {
        return { known: true, name:abilityNameMap[item] };
    }
    return { known: false, name: item };
}