const input = (await Deno.readTextFile('./day4' + '/input.txt'));
const lines = input.replaceAll('\r', '').split('\n\n'); // Be careful with different OSs new line formats.
const regex = /(\w{3}):([^\s]+)/g;
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let valid = 0;
for (const line of lines) {
    const foundFields = [];
    for (let i = 0; i < requiredFields.length; i++) { // We init a boolean array to determine which fields have been found
        foundFields.push(false);
    }
    const matches = [...line.matchAll(regex)];
    for (const match of matches) {
        const fieldIndex = requiredFields.findIndex(field => field === match[1]);
        foundFields[fieldIndex] = true; // We switch to true the ones we have found
    }

    if (foundFields.every(field => field)) { // If all are found passport is valid
        valid++;
    }
}

console.log(valid);