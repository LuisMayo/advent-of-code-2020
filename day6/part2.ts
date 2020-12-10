const input = (await Deno.readTextFile('./day6' + '/input.txt'));
const lines = input.replaceAll('\r', '').split('\n\n'); // Be careful with different OSs new line formats.

const charMap = new Map<string, number>();
for (const line of lines) { // per each group
    const persons = line.split('\n');
    let seen: string[] = [];
    for (const char of persons[0]) { // what did the first person in the group answer
        seen.push(char);
    }

    for (const person of persons) { // what things did the other members answered which were already in the first person answers
        seen = seen.filter(char => person.includes(char));
    }

    for (const char of seen) { // Add common answers to global map
        const currentNumber = charMap.get(char) || 0;
        charMap.set(char, currentNumber + 1);
    }
}

let sum = 0;
for (let number of charMap.values()) { // how many answers did we get in total
    sum += number;
}

console.log(sum);
