const input = (await Deno.readTextFile('./day2' + '/input.txt')).split('\n');
const regex = /(\d+)-(\d+) (\w): (\w*)/;

let valid = 0;
for (const line of input) {
    const result = line.match(regex) || [];
    const min = +result[1];
    const max = +result[2];
    const char = result[3];
    const password = result[4];
    const charcount = password.split('').reduce((value, item) => {
        if (item === char) {
            return value + 1;
        } else {
            return value;
        }
    }, 0);
    if (charcount >= min && charcount <= max) {
        valid++;
    }
}

console.log(valid)
