const input = (await Deno.readTextFile('./day7' + '/input.txt'));
let lines = input.replaceAll('\r', '').split('\n'); // Be careful with different OSs new line formats.
const regex = /(.*) bags contain (.+ bags?)/;
const regexBagEnum = /(\d+) (.*) bags?/;

class Content {
    constructor(public number: number, public type: string) {}
}

function checkIfBagContainsShinyGold(bagName: string): boolean {
    let itContains = bagName === 'shiny gold';
    const bagObj = contentMap.get(bagName);
    if (bagObj) {
        itContains = bagObj.some(content => content.type === 'shiny gold');
        if (!itContains) {
            for (const content of bagObj) {
                itContains = checkIfBagContainsShinyGold(content.type);
                if (itContains) break;
            }
        }
    }
    return itContains;
}

const contentMap = new Map<string, Content[]>();

for (let line of lines) {
    const match = line.match(regex) || [];
    const contentString = match[2];
    if (contentString && contentString.length > 0 && !contentString.includes('no other bags')) {
        const contentBags = contentString.split(', ');
        const contentArr = new Array<Content>();
        for (const bag of contentBags) {
            const matches = bag.match(regexBagEnum) || [];
            contentArr.push(new Content(+matches[1], matches[2]));
        }
        contentMap.set(match[1], contentArr);
    }
}

let count = 0;
for (const bag of contentMap.keys()) {
    if (checkIfBagContainsShinyGold(bag)) {
        count++;
    }
}

console.log(count);
