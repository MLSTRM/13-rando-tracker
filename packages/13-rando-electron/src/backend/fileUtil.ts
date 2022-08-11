import {readFileSync} from 'fs';

export function getLineBreakChar(data: string) {
    const indexOfLF = data.indexOf('\n', 1)  // No need to check first-character
    
    if (indexOfLF === -1) {
        if (data.indexOf('\r') !== -1) return '\r'
        
        return '\n'
    }
    
    if (data[indexOfLF - 1] === '\r') return '\r\n'
    
    return '\n'
}

export function parseCsvRow(input: string): string[] {
    const chunks: string[] = [];
    var remaining = input;
    while(remaining.length > 0){
        if(remaining.startsWith('"')){
            var end = remaining.indexOf('"',1);
            if(end < 0){
                throw new Error('Unclosed quoted segment in line');
            }
            var chunk = remaining.substring(1, end);
            chunks.push(chunk);
            remaining = remaining.slice(end+2);
        } else {
            var end = remaining.indexOf(',');
            if(end < 0){
                chunks.push(remaining);
                break;
            }
            var chunk = remaining.substring(0, end);
            chunks.push(chunk);
            remaining = remaining.slice(end+1);
        }
    }
    return chunks;
}

export function processCsv(pathToFile: string, processor: (row: string[]) => void): void {
    const fileData = readFileSync(pathToFile).toString('utf-8');
    const lineBreak = getLineBreakChar(fileData);
    const fileRows = fileData.split(lineBreak);
    for(const row of fileRows){
        const fields = parseCsvRow(row);
        processor(fields);
    }
}