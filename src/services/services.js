import {
    CORNER_CELLS,
    CROSS_CELLS,
    DIAMOND_CELLS,
    MIDDLE_CELL,
    PLAYERS,
    STYLENAMES,
    WINNING_COMBINATIONS
} from "@shared/constants";

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

const getBlankCellIndices = board => board.reduce((acc, cell, index) => {
	if (cell === '') acc.push(index)
	return acc;
}, []);

const getIndicesOfSelectionByPlayer = (board, player) => board.reduce((acc, cell, index) => {
    if (cell === player) acc = acc + index;
    return acc;
}, '');

const randomSelectionFromArray = arr => arr[Math.floor(Math.random() * arr.length)];
const getNextMoveByWin = (board, arr) => arr.reduce((acc, blankCell) => {
    let newBoard= [...board];
    newBoard[blankCell] = PLAYERS.X
    const { isWinner } = getWinCombs(newBoard, PLAYERS.X);
    if (isWinner) acc[PLAYERS.X].push(blankCell);
    newBoard[blankCell] = PLAYERS.O;
    const botWin = getWinCombs(newBoard, PLAYERS.O);
    if (botWin.isWinner) acc[PLAYERS.O].push(blankCell);
    return acc;
}, {[PLAYERS.X]: [], [PLAYERS.O]: []});

const checkForMove = (board, player, count) => board.filter(cell => cell === player).length === count;

const checkForCrossIndices = (board, player) => {
    const checkCrossIndices = getIndicesOfSelectionByPlayer(board, player);
    return CROSS_CELLS.some(comb => comb === checkCrossIndices);
}

const isNumber = number => typeof number === 'number';

// CHECK FOR FIRST MOVE IN CORNER
// const checkFirstMoveInCorner = (board, player) => {
//     if (checkForMove(board, player, 1)) {
//         const selectedIndex = board.findIndex(cell => cell === player)
//         return CORNER_CELLS.includes(selectedIndex)
//     }
//     return false;
// }

// CHECK FOR SECOND MOVE FOR CROSS SELECTION
const checkForSecondMoveCrossing = (board, player) => {
    if(checkForMove(board, player, 2)) {
        return checkForCrossIndices(board, player);
    }
    return false;
}

const getOppositeIndexFromCross = index => CROSS_CELLS.reduce((acc, comb) => {
    if (comb.includes(index)) acc = parseInt(comb.replace(index, ''));
    return acc;
}, null )

export const getBotMove = (board, lastMove) => {
    // GET BLANK CELLS FROM BOARD
    const blankCellIndices = getBlankCellIndices(board);

    // RETURN MIDDLE CELL WHEN PLAYER SELECTS CORNER CELLS
    // if (checkFirstMoveInCorner(board, PLAYERS.X)) return MIDDLE_CELL;
    if (board[MIDDLE_CELL] === '') return MIDDLE_CELL;
    // MAKE SECOND MOVE FOR CROSSINGS
    if (checkForSecondMoveCrossing(board, PLAYERS.X)) return randomSelectionFromArray(DIAMOND_CELLS);

    const getMoveByWin = getNextMoveByWin(board, blankCellIndices);
    // STEP 1: CHECK FOR PLAYER - WIN POSSIBILITY
    if(getMoveByWin[PLAYERS.O].length) return randomSelectionFromArray(getMoveByWin[PLAYERS.O]);
    // STEP 2: CHECK FOR BOT - WIN POSSIBILITY
    if(getMoveByWin[PLAYERS.X].length) return randomSelectionFromArray(getMoveByWin[PLAYERS.X]);
    // STEP 3: CHECK LAST PLAYER MOVE ON CORNER CELLS
    if (isNumber(lastMove) && CORNER_CELLS.includes(lastMove)) {
        const oppositeIndex = getOppositeIndexFromCross(lastMove);
        if (oppositeIndex !== null) return oppositeIndex;
    }
    // STEP 4: RETRIEVE FROM PRIORITY
    const firstPriorityCells = blankCellIndices.filter(blankCell => CORNER_CELLS.includes(blankCell));    
    if(firstPriorityCells.length) return randomSelectionFromArray(firstPriorityCells);
    
    // STEP 5: RETRIEVE FROM LESS PRIORITY
    return randomSelectionFromArray(blankCellIndices.filter(blankCell => !CORNER_CELLS.includes(blankCell)));
}
export default {
    getBotMove,
    getWinCombs,
    isBoardEmpty,
    isBoardFilled
}