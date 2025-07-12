export default function generateTaskName(): { taskName: string, number: number, } {
    const letter = getRandomLetterRecursive();
    let number = Math.trunc(Number(Math.random().toFixed(4)) * 10000);
    let taskName = "";

    // Необходимо для фиксированной длинны в 4 цифры
    switch (String(number).length) {
        case 1:
            number = number * 1000;
            break;
        case 2:
            number = number * 100;
            break;
        case 3:
            number = number * 10;
            break;
        default:
            break;
    }
    taskName = `${letter}-${number}`;
    return { taskName, number }
}

export function getRandomLetterRecursive(): string {
    const letter = Math.random() * 100;
    if (letter < 65 || letter > 90) {
        return getRandomLetterRecursive();
    }
    return String.fromCharCode(letter)
}

// A-Z = 65-90

// Y-5020
// R-4213
// F-1102