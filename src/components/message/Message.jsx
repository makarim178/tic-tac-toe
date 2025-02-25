import { useBoardStore } from '../../stores/board'
import './message.scss'
const Message = () => {
    const gameOn = useBoardStore((state) => state.gameOn);
    const isWin = useBoardStore((state) => state.isWin);
    const currPlayer = useBoardStore((state) => state.currentPlayer);
    const mutateNewBoard = useBoardStore((state) => state.setNewBoard);

    const getWinnerBadge = () => {
        if (!isWin) return `Draw! Better luck next time!`;            
        return `Congratulations! Player ${currPlayer} Wins!`;
    }
    return (
        <>
            {!gameOn && <div className="blur-container">
                <div className="reset-container">
                    <h3>{getWinnerBadge()}</h3>
                    <button
                        onClick={mutateNewBoard}
                    >
                        New Game
                    </button>
                </div>
            </div>}
        </>
    )
}

export default Message