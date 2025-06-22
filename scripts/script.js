const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    let gameBoard = [];

    // Sets up the board for the game
    /* in the form: [['*', '*', '*'],
                     ['*', '*', '*'],
                     ['*', '*', '*']] */
    // Each '*' is a Cell Object defined later on
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            const cell = Cell()
            cell.changeValue("*")
            row.push(cell)
        }
        gameBoard.push(row);
    }

    // Displays the game board without any modifications
    // (simply as an array)
    const displayBoard = () => gameBoard;

    // Replaces the placeholder symbol with the player's
    // symbol given user input (row and column)
    const insertChoice = (row, column, symbol) => {
        if (gameBoard[row][column].getValue() !== '*') {
            console.log("Invalid Move. There is already a symbol there.")
            return false;
        }
        gameBoard[row][column].changeValue(symbol);
        return symbol;
    }

    // Console logs the board neatly
    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            console.log(gameBoard[i][0].getValue() + gameBoard[i][1].getValue() + gameBoard[i][2].getValue())
        }
        return;
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
    let turn = player1;
    const board = gameBoard;

    const alternateTurns = () => {
        turn = turn === player1 ? player2 : player1;
        return;
    };

    const printPlayerTurn = (player) => {
        board.printBoard();
        console.log(`${player.getName()}'s Turn`);
    }

    const playRound = () => {
        while (true) {
            printPlayerTurn(turn);

            console.log("Where would you like to place the symbol? (give coordinates)")
            const row = prompt("Enter row: ");
            const column = prompt("Enter column: ")
    
            const chosen = gameBoard.insertChoice(row, column, turn.getSymbol());
    
            if (chosen === false) {
                break;
            } else {
                console.log("Move placed.");
                alternateTurns();
                continue;
            }
        }
    }

    return {playRound}
})();


controller.playRound();