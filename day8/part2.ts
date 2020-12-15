const input = (await Deno.readTextFile('./day8' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.

class CPU {
    accumulator = 0;
    PC = 0;
    // This array will contain for a index a boolean value indicating whether we've already executed the instruction at that offset
    doneInstructions: boolean[] = []; 

    constructor(private codedInstructions: string[]) { }

    executeNextStep() {
        if (this.PC >= this.codedInstructions.length || this.doneInstructions[this.PC] === true) {
            return false;
        } else {
            this.doneInstructions[this.PC] = true;
            this.decodeAndExecute(this.PC);
            return true;
        }
    }

    private decodeAndExecute(index: number) {
        const text = this.codedInstructions[index];
        const match = text.match(/(\w{3}) ([+-]\d+)/) || [];
        this.executeDecodedInstruction(match[1], +match[2]);
    }

    private executeDecodedInstruction(instruction: string, argument: number) {
        let pcInc = 1;
        switch (instruction) {
            case 'acc':
                this.accumulator += argument;
                break;
            case 'jmp':
                pcInc = argument;
                break;
            case 'nop':
            default:
                break;
        }
        this.PC += pcInc;
    }
}

for (let i = 0; i < lines.length; i++) {
    const originalLine = lines[i];
    let changed = false;
    if (lines[i].startsWith('jmp')) {
        lines[i] = lines[i].replace('jmp', ' nop');
        changed = true;
    } else if (lines[i].startsWith('nop')) {
        lines[i] = lines[i].replace('nop', ' jmp');
        changed = true;
    }
    const cpu = new CPU(lines);
    if (changed) { // Optimization only try if a line was changed
        while(cpu.executeNextStep());
    }
    if (cpu.PC === lines.length) {
        console.log(cpu.accumulator);
        break;
    } else {
        lines[i] = originalLine;
    }
}
