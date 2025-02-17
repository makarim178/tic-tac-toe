
import Player from '@components/player/player';
import { PLAYERS } from '@shared/constants';
import './dashboard.scss'

const Dashboard = () => {
    return (
        <div className="dashboard">
            { Object.keys(PLAYERS)
                .map( player => (
                    <Player key={player} playerName={player} />
                )
            )}
        </div>
    )
}

export default Dashboard;