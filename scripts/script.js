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
            const cell = Cell()
            cell.changeValue("*")
            row.push(cell)
        }
        gameBoard.push(row);
    }

    console.log(gameBoard);

    const displayBoard = () => gameBoard;

    const insertChoice = (row, column, symbol) => {
        if (gameBoard[row][column].getValue() !== '*') {
            console.log("Invalid Move. There is already a symbol there.")
            return false;
        }
        gameBoard[row][column].changeValue(symbol);
        return symbol;
    }

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++){
                console.log(gameBoard[i][j].getValue());
            }
        }
    }

    return {
        displayBoard,
        insertChoice,
        printBoard,
    };
})();

function Cell(symbol) {
    const changeValue = (newSymbol) => {
        symbol = newSymbol;
    }

    const getValue = () => symbol;

    return {
        changeValue,
        getValue,
    }
}

function Player(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    }
}

const controller = (function gameController(player1 = Player('Player One', 'X'), player2 = Player('Player Two', 'O')) {
    let turn = 0;
    const board = gameBoard;

    const alternateTurns = (turn) => {
        return turn === 0 ? 1 : 0;
    };

    const getPlayerTurn = () => turn;

    const printPlayerTurn = (player) => {
        console.log(board.printBoard());
        console.log(`${player.getName()}'s Turn`);
    }

    const playRound = () => {
        i = 0;
        while (i < 2) {
            printPlayerTurn(player1);

            console.log("Where would you like to place the symbol? (give coordinates)")
            const row = prompt("Enter row: ");
            const column = prompt("Enter column: ")
    
            const chosen = gameBoard.insertChoice(row, column, player1.getSymbol());
    
            if (chosen === false) {
                continue;
            } else {
                console.log("Move placed.")
                i += 1;
            }
        }
    }

    return {playRound}
})();


controller.playRound();