const input = (await Deno.readTextFile('./day10' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.

let numbers = lines.map(line => +line);
numbers = numbers.sort((a,b) => a - b);
numbers.unshift(0); // Power socket has 0 jolts

let oneJoltChanges = 0;
let threeJoltChanges = 1; // Start at 1 since the last change is always a 3 jolts one
for (let i = 0; i < numbers.length - 1; i++) {
    let difference = numbers[i + 1] - numbers[i];
    if (difference === 1) {
        oneJoltChanges++;
    } else if (difference === 3) {
        threeJoltChanges++;
    }
}

console.log(oneJoltChanges * threeJoltChanges);