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
let result = 1;
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
for (const slope of slopes) {
    trees = 0;
    for (let x = 0, y = 0; y < map[0].length; x += slope[0], y+= slope[1]) {
        x = x % map.length;
        if (map[x][y] === '#') {
            trees++;
        }
    }
    result *= trees;
}

console.log(result);