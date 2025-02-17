import { useBoardStore } from "../../stores/board"

const Reset = () => {
    const resetScores = useBoardStore((state) => state.setResetScores);
    const resetGame = useBoardStore((state) => state.setNewBoard);
    return (
        <div className="main-reset-container">
            <button className='btn-reset' onClick={resetScores}>Reset Players</button>
            <button className='btn-reset' onClick={resetGame}>Reset Game</button>
        </div> 
    )
}
export default Reset