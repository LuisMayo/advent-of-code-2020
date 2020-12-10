const input = (await Deno.readTextFile('./day5' + '/input.txt'));
const lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.

const foundIds: number[] = [];
const possibleIds = [];

// First we find all registered IDs
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
    foundIds.push(seatId);
}

// Then we populate a list with all possible IDs
for (let i = 0; i <= 127; i++) {
    for (let j = 0; j <= 7; j++) {
        const seatId = i * 8 + j;
        possibleIds.push(seatId);
    }
}

// Then we find mine
const myId = possibleIds.find(id => {
    return !foundIds.includes(id) && foundIds.includes(id + 1) && foundIds.includes(id - 1);
});

console.log(myId);