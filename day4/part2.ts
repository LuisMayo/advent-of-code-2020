const input = (await Deno.readTextFile('./day4' + '/input.txt'));
const lines = input.replaceAll('\r', '').split('\n\n'); // Be careful with different OSs new line formats.
const regex = /(\w{3}):([^\s]+)/g;
const fourDigitRegex = /^\d{4}$/;
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
        let currentValid = false;
        const value = match[2];
        switch (match[1]) {
            case 'byr':
                if (fourDigitRegex.test(value)) {
                    currentValid = +value >= 1920 && +value <= 2002;
                }
                break;
            case 'iyr':
                if (fourDigitRegex.test(value)) {
                    currentValid = +value >= 2010 && +value <= 2020;
                }
                break;
            case 'eyr':
                if (fourDigitRegex.test(value)) {
                    currentValid = +value >= 2020 && +value <= 2030;
                }
                break;
            case 'hgt':
                if (/^\d+(cm)|(in)$/.test(value)) {
                    const digitValue = +value.substring(0, value.length - 2);
                    if (value.endsWith('cm')) {
                        currentValid = digitValue >= 150 && digitValue <= 193;
                    } else {
                        currentValid = digitValue >= 59 && digitValue <= 76;
                    }
                }
                break;
            case 'hcl':
                currentValid = /^#[0-9a-f]{6}$/.test(value);
                break;
            case 'ecl':
                currentValid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
                break;
            case 'pid':
                currentValid = /^\d{9}$/.test(value);
                break;
        }
        foundFields[fieldIndex] = currentValid;
    }

    if (foundFields.every(field => field)) { // If all are found passport is valid
        valid++;
    }
}

console.log(valid);