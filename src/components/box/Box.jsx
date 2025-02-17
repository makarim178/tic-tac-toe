import './box.scss'
import PropTypes from 'prop-types'
import { useBoardStore } from '@stores/board'
import { STYLENAMES } from '@shared/constants'
import { getWinCombs } from '@services/services'


const Box = ({ index }) => {
    const board = useBoardStore((state) => state.board);
    const boxStyles = useBoardStore((state) => state.boxStyles);
    const gameOn = useBoardStore((state) => state.gameOn);
    const currPlayer = useBoardStore((state) => state.currentPlayer);

    const mutateBoard = useBoardStore((state) => state.setBoard);
    const mutateBoxStyles = useBoardStore((state) => state.setBoxStyles);
    const mutateCurrentPlayer = useBoardStore((state) => state.setCurrentPlayer);
    const mutateGamePlay = useBoardStore((state) => state.setGamePlay);
    const mutateScore = useBoardStore((state) => state.setScore);
    
    const retrieveBoxStyles = () => boxStyles[index] ?? ''
    const checkBoardEmpty = () => board[index] === '';

    const retrieveIndexesByPlayer = () => {
        const result = [...board];
        result[index] = currPlayer;
        return result.reduce((acc, p, i) => {
            if (p === currPlayer) acc.push(i);
            return acc;
        }, []);
    }

    const handleBoxStylesOnWin = winningNumbers => {
        // SET ALL BOXES NOT CLICKABLE
        // SET WINNING BOXES
        boxStyles.forEach((styles, i) => {
            if (winningNumbers.includes(i)) mutateBoxStyles(i, `${STYLENAMES.WIN} ${STYLENAMES.NOT_ALLOWED}`)
                else mutateBoxStyles(i, styles.includes(STYLENAMES.NOT_ALLOWED) ? styles : styles.concat(`${STYLENAMES.NOT_ALLOWED}`))
        });
    }

    const handleWinner = winningNumbers => {
        // STOP GAME
        mutateGamePlay(false);
        // HANDLE BOX STYLES
        handleBoxStylesOnWin(winningNumbers);
        // SET SCORE
        mutateScore(currPlayer);
    }

    const handleClick = () => {
        // CHECK IF BOX HAS ALREADY BEEN PRESSED
        // CHECK IF GAME IS OVER
        if (checkBoardEmpty() && gameOn) {
            // UPDATE BOARD FOR CLASSNAMES
            mutateBoxStyles(index, `${STYLENAMES.CLICKED} ${STYLENAMES.NOT_ALLOWED}`);
            // SET INDEXES FILLED BY PLAYERS
            mutateBoard(index, currPlayer);
            // CHECK FOR WINNER
            const { isWinner, winningNumbers } = getWinCombs(retrieveIndexesByPlayer());
            if(isWinner) {
                handleWinner(winningNumbers)
            } else {
                // SET CURRENT PLAYER
                mutateCurrentPlayer();
            }
        }
    }

    return (
        <div className={`box ${retrieveBoxStyles()}`} onClick={handleClick}>
            <span>
                {board[index]}
            </span>
        </div>
    )
}

Box.propTypes = {
    index: PropTypes.number
}

export default Box