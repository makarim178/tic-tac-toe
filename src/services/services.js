import { WINNING_COMBINATIONS, STYLENAMES } from "@shared/constants";
let winningNumbers = [];

const isMatchComb = (winningCombination, selectedCombinations) => winningCombination
    .every(num => selectedCombinations.includes(num));

const isWinCombs = selectedCombinations => WINNING_COMBINATIONS.some(numbers => {
    const wins = isMatchComb(numbers, selectedCombinations.map(Number))
    if (wins) winningNumbers = numbers;
    return wins;
});

const retrieveIndexesOfPlayer = (board, currentPlayer) => board.reduce((acc, p, i) => { 
    if (p === currentPlayer) acc.push(i);
    return acc;
}, []);

export const isBoardFilled = board => !board.filter(box => box === '').length;

export const getWinCombs = (board, currentPlayer) => {
    const selectedCombinations = retrieveIndexesOfPlayer(board, currentPlayer);
    const isWinner = isWinCombs(selectedCombinations);
    return { isWinner, winningNumbers }
}
export const boxStylesOnWin = (boxStyles, wn) => boxStyles.reduce((acc, bs, i) => {
    let style = bs;
    if (wn.includes(i)) {
        style = `${STYLENAMES.WIN} ${STYLENAMES.NOT_ALLOWED}`;
    } else if (!style.includes(STYLENAMES.NOT_ALLOWED)) {
        style = style.trim().concat(' ', STYLENAMES.NOT_ALLOWED);
    }
    acc.push(style);
    return acc;
}, []);

export const isBoardEmpty = board => board.every(b => b === '');

export const handleBoardAtEveryMove = () => {
    
}

export default {
    getWinCombs,
    isBoardEmpty,
    isBoardFilled
}