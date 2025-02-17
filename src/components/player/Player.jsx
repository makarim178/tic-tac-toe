import { useBoardStore } from '../../stores/board'
import './player.scss'
import PropTypes from 'prop-types'

const Player = ({ playerName }) => {
    const scores = useBoardStore((state) => state.scores);
    const currPlayer = useBoardStore((state) => state.currentPlayer);
    const getTurnClass = () => currPlayer === playerName ? 'active' : ''
    return (
        <div className={`player ${getTurnClass()}`}>
            <h4>Player: {playerName}</h4>
            <h4>Win: {scores[playerName]}</h4>
        </div>
    )
}

Player.propTypes = {
    playerName: PropTypes.string,
    winCount: PropTypes.number,
    isTurn: PropTypes.bool
}

export default Player;