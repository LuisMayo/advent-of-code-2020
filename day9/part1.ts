const input = (await Deno.readTextFile('./day9' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.
let numbers = lines.map(line => +line);
const preambleLength = 25;

function numberCanBeCalculatedWithPreamble(number: number) {
    let canBeCalculated = false;
    for (let i = 0; i < preambleLength && !canBeCalculated; i++) {
        for (let j = i; j < preambleLength && !canBeCalculated; j++) {
            canBeCalculated = preamble[i] + preamble[j] === number;
        }
    }
    return canBeCalculated;
}


let preamble = numbers.splice(0, preambleLength);
for (const number of numbers) {
    if (numberCanBeCalculatedWithPreamble(number)) {
        preamble.splice(0, 1);
        preamble.push(number);
    } else {
        console.log(number);
        break;
    }
}