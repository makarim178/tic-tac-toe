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

export default {
    getWinCombs
}