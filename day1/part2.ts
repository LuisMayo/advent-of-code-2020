const input = await Deno.readTextFile('./day1' + '/report-repair-input.txt');
const list = input.split('\n').map(item => +item.trim());
let found = false;
let numberA = -1, numberB = -1, numberC = -1;
for (let i = 0; i < list.length && !found; i++) {
    for (let j = 0; j < list.length && !found; j++) {
        for (let k = 0; k < list.length && !found; k++) {
            numberA = list[i];
            numberB = list[j];
            numberC = list[k];
            if (list[i] + list[j] + list[k] === 2020) {
                found = true;
            }
        }
    }
}

console.log(numberA * numberB * numberC);