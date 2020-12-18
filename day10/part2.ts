const input = (await Deno.readTextFile('./day10' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.


function studyIfItsPossible(slice: number[], end: number) {
    const possibleArrays = [];
    let isItPossible = 1;
   
}

let numbers = lines.map(line => +line);
numbers = numbers.sort((a,b) => a - b);
numbers.unshift(0); // Power socket has 0 jolts
const endNumber = numbers[numbers.length - 1];

let paths = 0;
for (let i = 0; i < numbers.length; i) {
    const firstImpossible = numbers.findIndex((value, index) => index > i && value - numbers[i] > 3);
    if (firstImpossible === -1) {
        i = numbers.length;
    } else {
        paths += firstImpossible - i - 1;
        i = firstImpossible;
    }
}

console.log(paths);