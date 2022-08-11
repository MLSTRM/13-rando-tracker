import { attachAndVerify, Characters, FF13MemoryReader, RandoMemoryState, Roles, scrapeRandoState } from "13-rando-autotracker";
import { prettyPrintItem, prettyPrintAbility, prettyPrintKeyItem } from '13-rando-core';
import _ from 'lodash';

const reservedKeys = ['time', 'region', 'mainQuestBytes'];

export class RandoBackend {
    private reader: FF13MemoryReader;
    private readerLoaded: boolean = false;
    private oldUnknownEp: string[] = [];
    private unknownRegions: Set<string> = new Set();
    private stateValid: boolean = false;

    private settings: BackendSettings = {
        halfCanvas: false
    };

    private oldState: Partial<BackendRandoMemoryState>;

    constructor(){
        this.reader = new FF13MemoryReader();
        this.oldState = {};
    }

    public disconnect(): void {
        this.reader.detatch();
        this.readerLoaded = false;
    }

    public async getState(): Promise<BackendRandoMemoryState | undefined> {
        if(!this.readerLoaded){
            this.readerLoaded = await attachAndVerify(this.reader);
            if(!this.readerLoaded){
                return undefined;
            }
        }
        const newState = scrapeRandoState(this.reader);
        if(this.checkStateValid(newState)){
            this.stateValid = true;
            this.oldState = newState;
            return this.prettifyState(newState);
        } else {
            this.stateValid = false;
            return undefined;
        }
    }

    public async getStateChanges(): Promise<Partial<BackendRandoMemoryState>> {
        if(!this.readerLoaded){
            this.readerLoaded = await attachAndVerify(this.reader);
            return {};
        } else {
            const newState = scrapeRandoState(this.reader);
            if(this.checkStateValid(newState)){
                this.stateValid = true;
                this.removeDuplicatesRecursive(this.oldState, newState);
                this.oldState =_.merge(this.oldState, newState);
                return this.prettifyState(newState);
            } else {
                this.stateValid = false;
                return {};
            }
        }
    }

    checkStateValid(state: RandoMemoryState): boolean {
        //TODO: What's the marker here?
        return true;
    }

    removeDuplicatesRecursive(obj1: any, obj2: any): any {
        for(const key of Object.keys(obj1).filter(k => !reservedKeys.includes(k))){
            if(obj1[key] instanceof Map || obj2[key] instanceof Map){
                continue;
            } 
            else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])){
                if(obj1[key].length === obj2[key].length){
                    if(obj1[key].every((v: any) => obj2[key].includes(v)) && obj2[key].every((v: any) => obj1[key].includes(v)) ){
                        delete obj2[key];
                    }
                }
            }
            else if(typeof obj1[key] === "object" && typeof obj2[key] === "object"){
                this.removeDuplicatesRecursive(obj1[key], obj2[key]);
                if(Object.keys(obj2[key]).length === 0){
                    delete obj2[key];
                }
            }
            else if(obj1[key] === obj2[key]){
                delete obj2[key];
            }
        }
    }

    prettifyState(state: BackendRandoMemoryState): BackendRandoMemoryState;
    prettifyState(state: Partial<BackendRandoMemoryState>): Partial<BackendRandoMemoryState> {
        //apply cleanup to state if required
        if(state.items){
            state.items = new Map([...state.items].map(kv => [prettyPrintItem(kv[0]).name,kv[1]]));
        }

        if(state.keyItems){
            state.keyItems = new Map([...state.keyItems].map(kv => [prettyPrintKeyItem(kv[0]).name,kv[1]]));
        }
        return state;
    }

    public checkRoleLevel(name: string, role: string): number {
        return this.stateValid ? this.oldState.characters?.[name as keyof Characters<any>]?.RoleLevels?.[role as keyof Roles<any>] ?? 0 : 0;
    }

    public checkItemCount(name: string): number {
        return this.stateValid ? this.oldState.items?.get(name) ?? 0 : 0;
    }

    public checkKeyItemCount(name: string): number {
        if(!this.stateValid){
            return 0;
        }
        var base = this.oldState.keyItems?.get(name) ?? 0;
        return base;
    }

    public checkChapterStatus(index: number): number | true {
        if(!this.stateValid){
            return 0;
        }
        if(index < 1 || index > 13){
            return 0;
        }
        var base = this.oldState.keyItems?.get(`chap_comp_${index.toString().padStart(2,'0')}`);
        if(base){
            return true;
        }
        var prog = this.oldState.keyItems?.get(`chap_prog_${index.toString().padStart(2,'0')}`);
        return prog ?? 0;
    }
}

interface BackendSettings {
    halfCanvas: boolean;
}

interface BackendRandoMemoryState extends RandoMemoryState {
}