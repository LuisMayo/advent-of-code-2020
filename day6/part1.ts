const input = (await Deno.readTextFile('./day6' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n\n'); // Be careful with different OSs new line formats.
lines = lines.map(line => line.replaceAll('\n', ''));

const charMap = new Map<string, number>();
for (const line of lines) {
    let seen = new Set<string>();
    for (const char of line) {
        seen.add(char);
    }

    for (const char of seen.values()) {
        const currentNumber = charMap.get(char) || 0;
        charMap.set(char, currentNumber + 1);
    }
}

let sum = 0;
for (let number of charMap.values()) {
    sum += number;
}

console.log(sum);
