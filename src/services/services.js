import {
    BOT_DIAMOND_CELL_SELECTION,
    CORNER_CELLS,
    CROSS_CELLS,
    DIAMOND_CELLS,
    DIAMOND_CELLS_COMBINATIONS,
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


export const isBoardFilled = board => !board.filter(box => box === '').length;

const retrieveIndexesOfPlayer = (board, player) => board.reduce((acc, cell, i) => { 
    if (cell === player) acc.push(i);
    return acc;
}, []);

const getBlankCellIndices = board => board.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index)
    return acc;
}, []);

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

export const isBoardEmpty = board => board.every(cell => cell === '');

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
    const checkCrossIndices = retrieveIndexesOfPlayer(board, player).join('');
    return CROSS_CELLS.some(comb => comb === checkCrossIndices);
}

const isNumber = number => typeof number === 'number';

const getOppositeIndexFromCross = index => CROSS_CELLS.reduce((acc, comb) => {
    if (comb.includes(index)) acc = parseInt(comb.replace(index, ''));
    return acc;
}, null );
const isSelectionMatchDiamondIndices = (board, player) => {
    const selection = retrieveIndexesOfPlayer(board, player).join('');
    console.log(selection);
    return {
        isMatch: DIAMOND_CELLS_COMBINATIONS.some(combination => combination === selection),
        selection
    };
}

const getBotSelectionForDiamondIndices = combination => BOT_DIAMOND_CELL_SELECTION[DIAMOND_CELLS_COMBINATIONS.findIndex(comb => comb === combination)]

export const getBotMove = (board, lastMove) => {
    // GET BLANK CELLS FROM BOARD
    const blankCellIndices = getBlankCellIndices(board);
    const isSecondMove = checkForMove(board, PLAYERS.X, 2);
    // STEP 1: RETURN MIDDLE INDEX IF EMPTY
    if (board[MIDDLE_CELL] === '') return MIDDLE_CELL;

    // MAKE SECOND MOVE FOR CROSSINGS
    if (isSecondMove) {
        // STEP 2 CHECK FOR CROSS INDICES
        // RETURN MIDDLE CELL WHEN PLAYER SELECTS CORNER CELLS
        if (checkForCrossIndices(board, PLAYERS.X)) return randomSelectionFromArray(DIAMOND_CELLS);
        // STEP 3: CHECK FOR SECOND MOVE && DIAMOND SELECTIONS
        const { isMatch, selection } = isSelectionMatchDiamondIndices(board, PLAYERS.X);
        if (isMatch) return getBotSelectionForDiamondIndices(selection);
    }
    
    const getMoveByWin = getNextMoveByWin(board, blankCellIndices);
    // STEP 4: CHECK FOR PLAYER - WIN POSSIBILITY
    if(getMoveByWin[PLAYERS.O].length) return randomSelectionFromArray(getMoveByWin[PLAYERS.O]);
    // STEP 5: CHECK FOR BOT - WIN POSSIBILITY
    if(getMoveByWin[PLAYERS.X].length) return randomSelectionFromArray(getMoveByWin[PLAYERS.X]);
    // STEP 6: CHECK LAST PLAYER MOVE ON CORNER CELLS
    if (isNumber(lastMove) && CORNER_CELLS.includes(lastMove)) {
        const oppositeIndex = getOppositeIndexFromCross(lastMove);
        if (oppositeIndex !== null && blankCellIndices.includes(oppositeIndex)) return oppositeIndex;
    }
    // STEP 7: RETRIEVE FROM PRIORITY
    const firstPriorityCells = blankCellIndices.filter(blankCell => CORNER_CELLS.includes(blankCell));
    if(firstPriorityCells.length) return randomSelectionFromArray(firstPriorityCells);

    // STEP 8: RETRIEVE FROM LESS PRIORITY
    return randomSelectionFromArray(blankCellIndices.filter(blankCell => !CORNER_CELLS.includes(blankCell)));
}
export default {
    getBotMove,
    getWinCombs,
    isBoardEmpty,
    isBoardFilled
}