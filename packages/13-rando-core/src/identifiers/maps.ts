export type ValidMapNames = keyof typeof zoneMappings;

export type ValidZoneNames<T> = T extends ValidMapNames ? keyof typeof zoneMappings[T]['zones'] : never;

export const zoneMappings = {
    "zm_mappt_all": {
        name: "Ark",
        zones: {
            "zm_mappt_011": "Divine Garden"
        }
    },
    "zm_maplx_all": {
        name: "Luxerion",
        zones: {
            "zm_maplx_011": "North Station Plaza",
            "zm_maplx_012": "North Station Platform",
            "zm_maplx_013": "North Station",
            "zm_maplx_021": "Restaurant District",
            "zm_maplx_022": "Wharf of the Faithful",
            "zm_maplx_023": "Twin Gates",
            "zm_maplx_031": "The Avenue",
            "zm_maplx_032": "Chocobo HQ", //unused?
            "zm_maplx_033": "Gallery Steps",
            "zm_maplx_041": "Plaza of Prayers",
            "zm_maplx_042": "Luxerion Hills",
            "zm_maplx_051": "Back Alleys",
            "zm_maplx_052": "Depots",
            "zm_maplx_053": "Wool Mill", //unused?
            "zm_maplx_054": "Chocobo Express",
            "zm_maplx_061": "Blessed Stroll",
            "zm_maplx_062": "North-South Corridor",
            "zm_maplx_071": "Idol Ave.",
            "zm_maplx_072": "South Station Platform",
            "zm_maplx_073": "South Station",
            "zm_maplx_074": "1st Ave.",
            "zm_maplx_075": "2nd Ave.",
            "zm_maplx_076": "3rd Ave.", //unused?
            "zm_maplx_081": "Pilgrim's Passage",
            "zm_maplx_082": "Clock Tower",
            "zm_maplx_083": "Pilgrim's Causeway",
            "zm_maplx_084": "Gate of Revelation",
            "zm_maplx_091": "Pilgrim's Gate",
            "zm_maplx_092": "Temporary Route",
            "zm_maplx_093": "Old Theater",
            "zm_maplx_094": "Rusted Gate",
            "zm_maplx_095": "Marketplace",
            "zm_maplx_101": "Cathedral Plaza",
            "zm_maplx_102": "Hall of Devotion",
            "zm_maplx_111": "Dilapidated Gate",
            "zm_maplx_112": "Broken Gate", //unused?
            "zm_maplx_113": "Wall of Wealth",
            "zm_maplx_114": "Wall of Joy",
            "zm_maplx_115": "Mangled Hill",
            "zm_maplx_116": "Lookout", //unused?
            "zm_maplx_117": "Relics of the Past", //unused?
            "zm_maplx_118": "The Trench",
            "zm_maplx_119": "Heretic Stronghold",
            "zm_maplx_121": "Forsaken Graveyard Gate",
            "zm_maplx_122": "Haunted Row",
            "zm_maplx_123": "Monument",
            "zm_maplx_124": "Sinner's Corner",
            "zm_maplx_125": "Dying Forest" //unused?
        }
    },
    "zm_maplx_lb1": {
        name: "Luxerion Cathedral (Final Day)",
        zones: {
            "zm_maplx_501": "Temple of Light",
            "zm_maplx_502": "God's Sanctum",
            "zm_maplx_503": "Altar of Salvation",
            "zm_maplx_504": "Altar of Judgment",
            "zm_maplx_505": "Altar of Atonement",
            "zm_maplx_506": "Altar of Birth",
            "zm_maplx_508": "Chamber of Creation",
        }
    },
    "zm_maplx_lb2": {
        name: "Cosmogenesis",
        zones: {
            "zm_maplx_509": "Sanct of Theogenesis"
        }
    },
    "zm_mapwl_all": {
        name: "Widlands",
        zones: {
            "zm_mapwl_011": "The Grasslands",
            "zm_mapwl_012": "Wildlands Station",
            "zm_mapwl_013": "Canopus Farms",
            "zm_mapwl_014": "Ravine Path",
            "zm_mapwl_021": "Aryas Climb",
            "zm_mapwl_022": "Aryas Village",
            "zm_mapwl_023": "Aryas Hill Ruin",
            "zm_mapwl_031": "City of Ruins",
            "zm_mapwl_041": "The Jagd Woods",
            "zm_mapwl_042": "Jagd Village",
            "zm_mapwl_043": "The Moogle Village",
            "zm_mapwl_044": "Shady Path",
            "zm_mapwl_051": "Rocky Crag",
            "zm_mapwl_052": "Sacred Path",
            "zm_mapwl_061": "Poltae",
            "zm_mapwl_062": "Bridge of Faith",
            "zm_mapwl_071": "Eremite Plains",
            "zm_mapwl_072": "The Research Camp",
            "zm_mapwl_073": "The Crash Site"
        }
    },
    "zm_mapwl_lb1": {
        name: "Temple of the Goddess (WL)",
        zones: {
            "zm_mapwl_p501": "Closed Hall",
            "zm_mapwl_p511": "War's Cage: Lower Level",
            "zm_mapwl_p512": "Hall of Avarice",
            "zm_mapwl_p521": "War's Cage: Middle Level",
            "zm_mapwl_p522": "Hall of Rebirth",
            "zm_mapwl_p531": "War's Cage: Highest Level",
            "zm_mapwl_p532": "Hall of Memory",
            "zm_mapwl_p541": "Altar of the Goddess"
        }
    },
    "zm_mapyu_all": {
        name: "Yusnaan",
        zones: {
            "zm_mapyu_011": "Yusnaan Station",
            "zm_mapyu_021": "The Patron's Palace",
            "zm_mapyu_031": "The Augur's Quarter",
            "zm_mapyu_041": "The Slaughterhouse",
            "zm_mapyu_042": "Coliseum Square",
            "zm_mapyu_043": "Road to War",
            "zm_mapyu_045": "Armor Alley",
            "zm_mapyu_051": "Pleasure Alley",
            "zm_mapyu_052": "Fountain Square",
            "zm_mapyu_053": "Side Alley",
            "zm_mapyu_054": "Cactuar Plaza",
            "zm_mapyu_061": "Plaza of Plenty",
            "zm_mapyu_062": "The Banquet of the Lord",
            "zm_mapyu_063": "Hawker's Row",
            "zm_mapyu_064": "Aromatic Market",
            "zm_mapyu_071": "Warehouse District",
            "zm_mapyu_081": "Lower City",
            "zm_mapyu_082": "Industrial Area",
            "zm_mapyu_083": "Industrial Area Gate",
            "zm_mapyu_091": "Cargo Station",
            "zm_mapyu_092": "Supply Line",
            "zm_mapyu_101": "Central Ave.",
            "zm_mapyu_121": "Underground Route"
        }
    },
    "zm_mapyu_lb1": {
        name: "The Patron's Palace",
        zones: {
            "zm_mapyu_501": "The Ballroom",
            "zm_mapyu_502": "Passageway",
            "zm_mapyu_503": "The Throne of the l'Cie",
            "zm_mapyu_504": "The Patron's Chambers",
            "zm_mapyu_505": "Hero's Garden",
            "zm_mapyu_506": "Gallery of Delights"
        }
    },
    "zm_mapdd_all": {
        name: "Dead Dunes",
        zones: {
            "zm_mapdd_011": "Ruffian",
            "zm_mapdd_012": "Bandit Den",
            "zm_mapdd_021": "Dead Dunes Station",
            "zm_mapdd_031": "Giant's Sandbox",
            "zm_mapdd_032": "The Giant's Head",
            "zm_mapdd_033": "The Giant's Hand",
            "zm_mapdd_041": "Dry Floodlands",
            "zm_mapdd_042": "Oasis Lighthouse",
            "zm_mapdd_051": "Atomos's Sands",
            "zm_mapdd_061": "The Grave of the Colossi",
            "zm_mapdd_071": "Tides of Chaos" //unused?
        }
    },
    "zm_mapdd_lb": {
        name: "Temple Ruins",
        zones: {
            "zm_mapdd_501": "Path of Ashes",
            "zm_mapdd_511": "Chamber of Dusk: Upper Level",
            "zm_mapdd_512": "Path of Ruin",
            "zm_mapdd_513": "Chamber of Plenilune: Upper Level",
            "zm_mapdd_514": "Sentry Row",
            "zm_mapdd_515": "Chamber of Flame",
            "zm_mapdd_516": "Path of Vicissitude",
            "zm_mapdd_517": "Sacred Grove",
            "zm_mapdd_518": "Serpent Way",
            "zm_mapdd_519": "Chamber of Murals", //unused?
            "zm_mapdd_531": "Path of the Dead",
            "zm_mapdd_532": "Hall of Trials", //unused?
            "zm_mapdd_533": "Walk of Abyss", //unused?
            "zm_mapdd_534": "Walk of Divinity", //unused?
            "zm_mapdd_535": "Grand Hall",
            "zm_mapdd_536": "Walk of Peace",
            "zm_mapdd_537": "Mirrored Chamber", //unused?
            "zm_mapdd_538": "Walk of Revelations", //unused?
            "zm_mapdd_541": "Tablet Chamber", //unused?
            "zm_mapdd_542": "Path of Atonement", //unused?
            "zm_mapdd_555": "Chamber of Dusk: Lower Level",
            "zm_mapdd_556": "Chamber of Plenilune: Lower Level",
            "zm_mapdd_557": "Gallery of Forgetfulness",
            "zm_mapdd_558": "Chamber of Floods (Sacred Gate)",
            "zm_mapdd_559": "Twilight Gallery",
            "zm_mapdd_560": "Headless Pass", //unused
            "zm_mapdd_561": "Banishment Pass",
            "zm_mapdd_562": "Path of Debris", //unused
            "zm_mapdd_563": "Path of Desolation", //unused
            "zm_mapdd_564": "Path of Brimstone",
            "zm_mapdd_565": "Confinement Pass",
            "zm_mapdd_566": "Clavis Chamber",
            "zm_mapdd_567": "Golden Chamber: Upper Level",
            "zm_mapdd_568": "Golden Chamber: Lower Level",
            "zm_mapdd_569": "Scorched Earth: Upper Level",
            "zm_mapdd_570": "Scorched Earth: Lower Level",
            "zm_mapdd_571": "Gallery of Creation",
        }
    },
    "zm_mapdd_lb2": {
        name: "Shrine of the Tablet: Dry Floodlands (?)",
        zones: {
            "zm_mapdd_601": "False Sanctuary"
        }
    },
    "zm_mapdd_lb3": {
        name: "Shrine of the Tablet: Atomos's Sands",
        zones: {
            "zm_mapdd_701": "Fantastic Sanctuary"
        }
    },
    "zm_mapdd_lb4": {
        name: "Shrine of the Tablet: The Grave of the Colossi",
        zones: {
            "zm_mapdd_801": "Holy Sanctuary",
        }
    },
    "zm_mapdd_lb5": {
        name: "The Ultimate Lair",
        zones: {
            "zm_mapdd_901": "Level 1",
            "zm_mapdd_902": "Level 2",
            "zm_mapdd_903": "Level 3",
            "zm_mapdd_904": "Level 4",
            "zm_mapdd_905": "Level 5",
            "zm_mapdd_906": "Level 6",
            "zm_mapdd_907": "Level 7",
            "zm_mapdd_908": "Level 8",
            "zm_mapdd_909": "Level 9",
            "zm_mapdd_910": "Level 10",
            "zm_mapdd_911": "Level 11",
            "zm_mapdd_912": "Level 12",
            "zm_mapdd_913": "Level 13",
            "zm_mapdd_914": "Level 14",
            "zm_mapdd_915": "Level 15",
            "zm_mapdd_916": "Level 16",
            "zm_mapdd_917": "Level 17",
            "zm_mapdd_918": "Level 18",
            "zm_mapdd_919": "Level 19",
            "zm_mapdd_920": "Level 20",
            "zm_mapdd_921": "Level 21",
            "zm_mapdd_922": "Level 22",
            "zm_mapdd_923": "Level 23",
            "zm_mapdd_924": "Level 24",
            "zm_mapdd_925": "Level 25",
            "zm_mapdd_926": "Level 26",
            "zm_mapdd_927": "Level 27",
            "zm_mapdd_928": "Level 28",
            "zm_mapdd_929": "Level 29",
            "zm_mapdd_930": "Level 30",
            "zm_mapdd_931": "Level 31",
            "zm_mapdd_932": "Level 32",
            "zm_mapdd_933": "Level 33",
            "zm_mapdd_934": "Level 34",
            "zm_mapdd_935": "Level 35",
            "zm_mapdd_936": "Level 36",
            "zm_mapdd_937": "Level 37",
            "zm_mapdd_938": "Level 38",
            "zm_mapdd_939": "Level 39",            
            "zm_mapdd_940": "Final Level",
        }
    },
    "zm_mapwd_all": {
        name: "Major Routes",
        zones: {
            "zm_mapwd_010": "Luxerion - Wildlands",
            "zm_mapwd_011": "Wildlands - Luxerion",
            "zm_mapwd_020": "Dead Dunes - Wildlands",
            "zm_mapwd_021": "Wildlands - Dead Dunes",
            "zm_mapwd_030": "Dead Dunes - Yusnaan",
            "zm_mapwd_031": "Yusnaan - Dead Dunes"
        }
    },
    "unk": {
        name: "Unknown Region",
        zones: {
            "unk": "Unknown zone"
        }
    }
}

function mapIsValid(map: string): map is ValidMapNames {
    return !!zoneMappings[map as ValidMapNames];
}

function extractMapOrUnknown(map: string): ValidMapNames {
    return mapIsValid(map) ? map : 'unk';
}

function zoneIsValid<T extends ValidMapNames>(map: T, zone: string): string | undefined {
    const mapping = zoneMappings[map] as {name: string; zones: {[key: string]: string}};
    return !!mapping.zones.hasOwnProperty(zone) ? mapping.zones[zone] : undefined;
}

export function extractZoneInfo(rawMap: string, rawZone: string): {map: string, zone: string, known: boolean} {
    const map: ValidMapNames = extractMapOrUnknown(rawMap.substring(1).trim());
    const zone = rawZone.substring(1).trim();
    const knownMap = zoneMappings[map];
    if(knownMap && map!=='unk'){
        const resolvedMap = knownMap.name;
        const knownZone = zoneIsValid(map, zone);
        if(knownZone){
            return {
                map: resolvedMap,
                zone: knownZone,
                known: true
            };
        }
        return {
            map: resolvedMap,
            zone: `Unknown zone: ${zone}`,
            known: false
        };
    }
    return {
        map: `Unknown region - ${rawMap}`,
        zone: zone,
        known: false
    };
}