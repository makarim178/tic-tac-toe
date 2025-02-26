// export const WINNING_COMBINATIONS = [[1,2,3],[4,5,6], [7,8,9], [1,4,7],[2,5,8],[3,6,9], [1,5,9], [3,5,7]];
export const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

export const CORNER_CELLS = [0,2,6,8];
export const DIAMOND_CELLS = [1,3,5,7];
export const DIAMOND_CELLS_COMBINATIONS = ['13', '15', '37', '57'];
export const CROSS_CELLS = ['08', '26'];
export const BOT_DIAMOND_CELL_SELECTION = [0, 2, 6, 8];
export const MIDDLE_CELL = 4;

export const STYLENAMES = {
    CLICKED: 'box-bg',
    NOT_ALLOWED: 'not-allowed',
    WIN: 'box-wins',
    BOT: 'cell-bot'
}

export const PLAYERS = {
    X: 'X',
    O: 'O'
}

export const BOARD_REF = {
    'box-01': {
        player: '',
        className: []
    },
    'box-02': {
        player: '',
        className: []
    },
    'box-03': {
        player: '',
        className: []
    },
    'box-04': {
        player: '',
        className: []
    },
    'box-05': {
        player: '',
        className: []
    },
    'box-06': {
        player: '',
        className: []
    },
    'box-07': {
        player: '',
        className: []
    },
    'box-08': {
        player: '',
        className: []
    },
    'box-09': {
        player: '',
        className: []
    },
};

export const WINNING_COUNT_REF = {
    X: 0,
    O: 0
};

export const SELECTED_BOXES_PLYER_REF = {
    X: [],
    O: []
}
