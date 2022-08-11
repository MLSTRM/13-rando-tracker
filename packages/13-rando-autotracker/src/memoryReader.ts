import type memoryjs from "memoryjs";
import { DataTypes, Process } from "memoryjs";

const FF13Process = "ffxiiiimg.exe";

export class FF13MemoryReader {
    private processObject: Process | undefined;
    private debug: boolean;
    private memoryjs: typeof memoryjs | undefined;

    constructor(debug = false){
        this.debug = debug;
    }

    async tryAttach(): Promise<boolean> {
        if(!this.memoryjs){
            try {
                this.memoryjs = await import('memoryjs');
            } catch (err){
                console.debug('memoryjs unavailable');
                return false;
            }
        }
        this.processObject = this.memoryjs.openProcess(FF13Process);
        if(this.debug){
            console.log(JSON.stringify(this.processObject));
        }
        return !!this.processObject.szExeFile;
    }

    isAttached(): boolean {
        return !!this.processObject?.szExeFile;
    }

    readMemoryAddress(offset: number, dataType: DataTypes, absolute = false): any {
        if(!this.memoryjs){
            return undefined;
        }
        if(!this.processObject){
            return undefined;
        }
        if(this.debug){
            console.log(JSON.stringify({
                base: this.processObject.modBaseAddr.toString(16),
                offset: offset.toString(16),
                absolute
            }));
        }
        const address = absolute ? offset : this.processObject.modBaseAddr + offset;
        return this.memoryjs.readMemory(this.processObject.handle, address, dataType);
    }

    readBuffer(offset: number, length: number, absolute = false): Buffer {
        if(!this.memoryjs){
            return Buffer.from('');
        }
        if(!this.processObject){
            return Buffer.from('');
        }
        if(this.debug){
            console.log(JSON.stringify({
                base: this.processObject.modBaseAddr.toString(16),
                offset: offset.toString(16),
                absolute
            }));
        }
        const address = absolute ? offset : this.processObject.modBaseAddr + offset;
        return this.memoryjs.readBuffer(this.processObject.handle, address, length);
    }

    getModules(){
        if(!this.memoryjs){
            return;
        }
        console.log(JSON.stringify(this.memoryjs.getModules(this.processObject?.th32ProcessID).map(m => m.szModule)));
    }

    detatch(): void {
        this.processObject = undefined;
    }
}