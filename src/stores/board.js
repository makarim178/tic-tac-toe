import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { PLAYERS, STYLENAMES } from '@shared/constants';

const boardStore = (set) => ({
    board: Array(9).fill(''),
    boxStyles: Array(9).fill(''),
    currentPlayer: PLAYERS.X,
    playerLastMoveIndex: null,
    isWin: false,
    botTurn: false,
    scores: {
        [PLAYERS.X]: 0,
        [PLAYERS.O]: 0
    },
    gameOn: true,
    setPlayersLastMoveIndex: (index) => set(() => ({ playerLastMoveIndex: index})),
    setCurrentPlayer: () => set((state) => {
        if(state.currentPlayer === PLAYERS.X) return { currentPlayer: PLAYERS.O };
        return { currentPlayer: PLAYERS.X }
    }),
    setBoard: (index, content) => set((state) => {
        let nb = [ ...state.board];
        nb[index] = content;
        let newBoxStyles = [ ...state.boxStyles];
        newBoxStyles[index] = `${STYLENAMES.CLICKED} ${STYLENAMES.NOT_ALLOWED}`
        return { board: nb, boxStyles: newBoxStyles, botTurn: !state.botTurn };
    }),
    setBoardStyles: content => set(() => ({ boxStyles: content })),
    setBoxStyles: (index, content) => set((state) => {
        let ns = [ ...state.boxStyles];
        ns[index] = content;
        return { boxStyles: ns };
    }),
    setGamePlay: value => set(() => ({ gameOn: value })),
    setScore: player => set((state) => {
        let currScore = state.scores[player] + 1;
        return { scores: { ...state.scores, [player]: currScore }, isWin: true};
    }),
    setResetScores: () => set(() => ({
        scores: { [PLAYERS.X]: 0, [PLAYERS.O]: 0}
    })),
    setNewBoard: () => set(() => ({
        board: Array(9).fill(''),
        boxStyles: Array(9).fill(''),
        currentPlayer: PLAYERS.X,
        gameOn: true,
        isWin: false,
        botTurn: false,
        playerLastMoveIndex: null
    }))
})

export const useBoardStore = create(devtools(boardStore));