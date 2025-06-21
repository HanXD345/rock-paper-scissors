const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    let gameBoard = [];

    // Sets up the board for the game
    /* in the form: [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]] */
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(0);
        }
        gameBoard.push(row);
    }

    const displayBoard = () => gameBoard;

    const insertChoice = (row, column, symbol) => {
        gameBoard[row][column] = symbol;
    }

    return {
        displayBoard,
        insertChoice,
    };
})();

function Player(name, symbol) {
    const name = () => name;
    const symbol = () => symbol;

    return {
        name,
        symbol,
    }
}

function gameController() {
    ;
}

console.log(gameBoard.displayBoard());