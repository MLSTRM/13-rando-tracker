import { readdirSync, readFileSync } from "fs";
import { join } from 'path';
import { getLineBreakChar, parseCsvRow, processCsv } from "./fileUtil";
import * as cheerio from "cheerio";

//TODO: rewrite this for ff13 data files
export class HintBackend {
    private randoDataLoc?: string;
    private seedDocsDir?: string;

    private HintLocationMapping: Map<string, string> = new Map();

    private seedData?: SeedData

    public HintBackend(){
    }

    public setupRandoDataLocation(loc: string): boolean {
        try {
            const files = readdirSync(loc);
            if(files.includes('treasures.csv')){
                this.randoDataLoc = loc;
                console.log('Resolved rando data');
                return true;
            }
        } catch (err){
            console.error('Unable to load rando data');
        }
        return false;
    }

    public setupSeedDocsDir(loc: string): boolean {
        try {
            const files = readdirSync(loc);
            if(files.includes('treasures.html') && files.includes('battles.html')){
                this.seedDocsDir = loc;
                console.log('Resolved seed data');
                return true;
            }
        } catch (err){
            console.error('Unable to load seed data');
        }
        return false;
    }

    public prepareHintMapping(): void {
        if(!this.randoDataLoc){
            return;
        }
        const treasureDataFile = join(this.randoDataLoc, 'treasures.csv');
        processCsv(treasureDataFile, this.hintLoadFromRow.bind(this));

        const battleDataFile = join(this.randoDataLoc, 'battleDrops.csv');
        processCsv(battleDataFile, this.hintLoadFromRow.bind(this));
    }

    private hintLoadFromRow([id, location, name, type, condition, depth]: string[]) {
        if(id === 'ID' && location === 'Location'){
            //Assume header row
            return;
        }
        this.HintLocationMapping.set(name, location);
    }

    public parseSeedData(): false | string {
        if(!this.seedDocsDir){
            return false;
        }
        const files = readdirSync(this.seedDocsDir);
        var id;
        for(const file of files){
            const match = file.match(/LRRando_(\d+)_Seed\.json/)
            if(match){
                id = match[1];
            }
        }
        if(!id){
            console.log('Unable to resolve seed data file');
            return false;
        }
        const battleData = readFileSync(join(this.seedDocsDir, 'battles.html'));
        const battleDom = cheerio.load(battleData);
        const battles: Map<string, string> = new Map();
        battleDom('.tm-content table:first-child tr:not(:first-child)').each((idx, el) => {
            const children = battleDom(el).children();
            battles.set(children.eq(0).text(), children.eq(1).text());
        });
        if(battles.size === 0){
            console.log('Unable to load boss data');
            return false;
        }
        const treasureData = readFileSync(join(this.seedDocsDir, 'treasures.html'));
        const treasureDom = cheerio.load(treasureData);
        const hints: Map<string, HintLocation[]> = new Map();
        treasureDom('#mainquesthints tr:not(:first-child)').each((idx, row) => {
            const cells = treasureDom(row).children();
            const quest = cells.eq(0).text();
            const hint = cells.eq(1).text();
            const lineSplit = getLineBreakChar(hint);
            const hintLines = hint.split(lineSplit);
            const hintArr: HintLocation[] = [];
            for(const line of hintLines){
                if(line.length < 1){
                    continue;
                }
                const lineMatch = line.match(/(.*?) has (.*)/);
                if(!lineMatch){
                    continue;
                }
                const [full, location, item, ...rest] = lineMatch;
                // Does this work for all hint types??
                const resolvedArea = this.HintLocationMapping.get(location) || '';
                if(resolvedArea === '' && hintAreaIdx[location]){
                    hintArr.push({
                        area: location,
                        item,
                        location: '?????'
                    });
                } else {
                    hintArr.push({
                        area: this.HintLocationMapping.get(location) || '',
                        item,
                        location
                    });
                }
            }
            hints.set(quest, hintArr);
        });
        if(hints.size === 0){
            console.log('Unable to resolve hint data (failure in main quest hint parsing)');
            return false;
        }
        const areaHints: Map<string, AreaHint> = new Map();
        treasureDom('#libranotehints tr:not(:first-child)').each((idx, row) => {
            const cells = treasureDom(row).children();
            const note = cells.eq(0).text();
            const hint = cells.eq(1).text();
            const lineMatch = hint.match(/(.*?) has (\d+) important checks./);
            if(!lineMatch){
                return;
            }
            const [full, area, countStr, ...rest] = lineMatch;
            const count = Number(countStr);
            if(isNaN(count)){
                return;
            }
            areaHints.set(note, {
                area,
                count
            });
        });
        if(areaHints.size === 0){
            console.log('Unable to resolve hint data (failure in libra parsing)');
            return false;
        }
        this.seedData = {
            id,
            hints,
            battles,
            areaHints
        }
        console.log('Loaded and parsed hint data');
        return id;
    }

    public debugSeedData(): void {
        if(!this.seedData){
            console.log('No seed data resolved');
            return;
        }
        console.log(this.seedData.id);
        console.log(JSON.stringify([...this.seedData.battles]));
        console.log(JSON.stringify([...this.seedData.hints]));
        console.log(JSON.stringify([...this.seedData.areaHints]));
    }

    public mapBossNames(bosses: string[]): string[] {
        if(!this.seedData){
            return [];
        }
        return bosses.map(b => this.seedData?.battles.get(b) || '');
    }

    public resolveHintsForQuest(quest: string): HintLocation[] {
        // console.log(`Resolving hints for ${quest}`);
        if(!this.seedData){
            return [];
        }
        const hints = this.seedData.hints.get(quest) || [];
        return hints.map(h => ({
            ...h,
            area: mapArea(h.area)
        }));
    }

    public resolveAreaHints(libraItems: string[]): AreaHint[] {
        return libraItems.map(lib => this.seedData?.areaHints.get(lib))
            .filter(exists)
            .map(({area, count}) => ({
                area: mapArea(area),
                count
            }));
    }
}

function exists<T>(item: T | undefined): item is T {
    return !!item;
}

function mapArea(area: string): string {
    if(hintAreaIdx[area]){
        return hintAreaIdx[area];
    }
    return '-1';
}

const hintAreaIdx = Object.freeze({
    'Ark': '0',
    'CoP Global': '1',
    'Luxerion': '2',
    'CoP Luxerion': '3',
    'Yusnaan': '4',
    'CoP Yusnaan': '5',
    'Wildlands': '6',
    'CoP Wildlands': '7',
    'Dead Dunes': '8',
    'CoP Dead Dunes': '9',
    'Soul Seeds/Unappraised': '10',
    'Ultimate Lair': '11',
    'Final Day': '12'
}) as {[key: string]: string};

interface SeedData {
    id: string;
    hints: Map<string, HintLocation[]>;
    battles: Map<string, string>;
    areaHints: Map<string, AreaHint>;
}

export interface HintLocation {
    area: string;
    location: string;
    item: string;
}

export interface AreaHint {
    area: string;
    count: number;
}