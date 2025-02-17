import { create } from 'zustand'
import { PLAYERS } from '@shared/constants';

export const useBoardStore = create((set) => ({
    board: Array(9).fill(''),
    boxStyles: Array(9).fill(''),
    currentPlayer: PLAYERS.X,
    isWin: false,
    scores: {
        [PLAYERS.X]: 0,
        [PLAYERS.O]: 0
    },
    gameOn: true,
    setCurrentPlayer: () => set((state) => {
        if(state.currentPlayer === PLAYERS.X) return { currentPlayer: PLAYERS.O };
        return { currentPlayer: PLAYERS.X }
    }),
    setBoard: (index, content) => set((state) => {
        let nb = [ ...state.board];
        nb[index] = content;
        return { board: nb };
    }),
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
    setResetScores: () => set(() => ({ scores: { [PLAYERS.X]: 0, [PLAYERS.O]: 0}})),
    setNewBoard: () => set(() => ({
        board: Array(9).fill(''),
        boxStyles: Array(9).fill(''),
        currentPlayer: PLAYERS.X,
        gameOn: true,
        isWin: false
    }))
}))