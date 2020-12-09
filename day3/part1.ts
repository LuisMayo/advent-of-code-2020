const input = (await Deno.readTextFile('./day3' + '/input.txt'));
const lines = input.split('\n').map(line => line.replaceAll("\r", ""));
let map: string[][] = [];
for (let i = 0; i < lines[0].length; i++) {
    const column = [];
    for (const line of lines) {
        column.push(line.charAt(i));
    }
    map.push(column);
}

let trees = 0;

for (let x = 0 , y = 0; y < map[0].length; x += 3, y++)  {
    x = x % map.length;
    if (map[x][y] === '#') {
        trees++;
    }
}
console.log(trees);