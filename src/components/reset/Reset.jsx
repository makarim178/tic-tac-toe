import { useBoardStore } from "@stores/board"

const Reset = () => {
    const resetScores = useBoardStore((state) => state.setResetScores);
    const resetGame = useBoardStore((state) => state.setNewBoard);
    return (
        <div className="main-reset-container">
            <button onClick={resetScores}>Reset Scores</button>
            <button onClick={resetGame}>Reset Game</button>
        </div> 
    )
}
export default Reset