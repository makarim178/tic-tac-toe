import './player.scss'
import PropTypes from 'prop-types'

const Player = ({ playerName, winCount, isTurn }) => {
    const getTurnClass = () => isTurn ? 'active' : ''
    return (
        <div className={`player ${getTurnClass()}`}>
            <h4>Player: {playerName}</h4>
            <h4>Win: {winCount ?? 0}</h4>
        </div>
    )
}

Player.propTypes = {
    playerName: PropTypes.string,
    winCount: PropTypes.number,
    isTurn: PropTypes.bool
}

export default Player;