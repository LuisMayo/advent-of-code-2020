const input = (await Deno.readTextFile('./day5' + '/input.txt'));
const lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.

let maxId = 0;
for (const line of lines) {
    let rowMin = 0;
    let rowMax = 127;
    let columnMin = 0;
    let columnMax = 7;
    for (const char of line) {
        let rowMiddle = ((rowMax - rowMin + 1) / 2) + rowMin;
        let columnMiddle = ((columnMax - columnMin + 1) / 2) + columnMin;
        switch (char) {
            case 'B':
                rowMin = rowMiddle;
                break;
            case 'F':
                rowMax = rowMiddle - 1;
                break;
            case 'R':
                columnMin = columnMiddle;
                break;
            case 'L':
                columnMax = columnMiddle - 1;
                break;
        }
    }
    const seatId = rowMax * 8 + columnMax;
    if (seatId > maxId) {
        maxId = seatId;
    }
}

console.log(maxId);