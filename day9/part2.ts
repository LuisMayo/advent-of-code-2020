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


/// First let's found the strange value
let preamble = numbers.slice(0, preambleLength);
let invalidNumber = -1;
for (let i = preambleLength; i< numbers.length; i++) {
    const number = numbers[i];
    if (numberCanBeCalculatedWithPreamble(number)) {
        preamble.splice(0, 1);
        preamble.push(number);
    } else {
        invalidNumber = number;
        break;
    }
}

// 'i' will mark the number of elements we're adding right now
for (let i = 2; i <= numbers.length; i++) {
    // 'j' will mark the index from which we're adding. i.e: for i=3 and j=4 we'll try adding possitions 4, 5 and 6
    for (let j = 0; j + i < numbers.length + 1; j++) {
        const numbersToBeAdded = numbers.slice(j, j + i);
        const sum = numbersToBeAdded.reduce((previous, first) => previous + first, 0);
        if (sum === invalidNumber) { // We got it!
            const sortedNumbers = numbersToBeAdded.sort((a,b) => a - b );
            console.log(sortedNumbers[0] + sortedNumbers[sortedNumbers.length - 1]);
            break;
        }
    }
}