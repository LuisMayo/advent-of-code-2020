const input = (await Deno.readTextFile('./day2' + '/input.txt')).split('\n');
const regex = /(\d+)-(\d+) (\w): (\w*)/;

let valid = 0;
for (const line of input) {
    const result = line.match(regex) || [];
    const positionA = +result[1];
    const positionB = +result[2];
    const char = result[3];
    const password = result[4];
    if ((password[positionA - 1] === char) !== (password[positionB - 1] === char)) {
        valid++;
    }
}

console.log(valid)
