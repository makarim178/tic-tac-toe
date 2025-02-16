import { WINNING_COMBINATIONS } from "@shared/constants";
let winningNumbers = [];

const isMatchComb = (winningCombination, selectedCombinations) => winningCombination
    .every(num => selectedCombinations.includes(num));

const isWinCombs = selectedCombinations => WINNING_COMBINATIONS.some(numbers => {
    const wins = isMatchComb(numbers, selectedCombinations.map(Number))
    if (wins) winningNumbers = numbers;
    return wins;
})

export const getWinCombs = selectedCombinations => {
    const isWinner = isWinCombs(selectedCombinations);
    return { isWinner, winningNumbers }
}

export const listClassNames = (listNames, newNames) => {
    return newNames.reduce((acc, name) => {
        if (!acc.includes(name)) acc.push(name)
        return acc;
    }, listNames);
}

export const removeClassName = (listNames, replaceName) => listNames.filter(name => name !== replaceName);

export default {
    getWinCombs, 
    listClassNames,
    removeClassName
}