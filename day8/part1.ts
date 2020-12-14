const input = (await Deno.readTextFile('./day8' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.

class CPU {
    accumulator = 0;
    PC = 0;
    // This array will contain for a index a boolean value indicating whether we've already executed the instruction at that offset
    doneInstructions: boolean[] = []; 

    constructor(private codedInstructions: string[]) { }

    executeNextStep() {
        if (this.doneInstructions[this.PC] === true) {
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

const cpu = new CPU(lines);
while(cpu.executeNextStep());
console.log(cpu.accumulator);
