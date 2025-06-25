// Sets up the main game board for
// tic tac toe
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
    const getBoard = () => gameBoard;

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

    const locations = {
        rows: [0, 0, 0],
        columns: [0, 0, 0],
        diagonals: [0, 0],
    }

    let winner = false;

    const detectWinner = (row, column, incrementVal) => {
        console.log(row, column);

        locations.rows[row] += incrementVal;
        locations.columns[column] += incrementVal;

        if (row === column) {
            console.log("Goes through 1");
            locations.diagonals[0] += incrementVal;
        }
        
        if ((row == column && column == 1) || ((row == 0 && column == 2) || (row == 2 && column == 0))) {
            console.log("Goes through 2");
            locations.diagonals[1] += incrementVal;
        }


        console.log(Object.values(locations));
        Object.values(locations).forEach((value) => {
            if (value.includes(3) || value.includes(-3)) {
                winner = true;
            }
        })

        console.log(locations.rows);
        console.log(locations.columns);
        console.log(locations.diagonals);

        return winner;

    }

    return {
        getBoard,
        insertChoice,
        printBoard,
        detectWinner,
    };
})();

// Cell object containing a symbol,
// as well as a function that can 
// change the symbol
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

// Player object which contains player name
// and their symbol
function Player(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    }
}

// Sets up the controller for the game
// Logic: There will be two players. Each 
// player will alternate turns, choosing 
// where they want to place their respective 
// symbol onto the board. A player can win if
// they can get their symbol to be in a row
// while not letting the other player to do the 
// same.
const controller = (function gameController(player1 = Player('Player One', 'X'), player2 = Player('Player Two', 'O')) {
    let turn = player1;
    const board = gameBoard;

    // Toggles the turn after each round
    const alternateTurns = () => {
        turn = turn === player1 ? player2 : player1;
        return;
    };

    // Displays the game board (formatted) as
    // well as the current player's turn.
    const printPlayerTurn = (player) => {
        board.printBoard();
        console.log(`${player.getName()}'s Turn`);
    }

    // Plays a single round of tic tac toe (console)
    const playRound = (row, column) => {
        while (true) {
            const chosen = gameBoard.insertChoice(row, column, turn.getSymbol());
    
            if (chosen === false) {
                break;
            } else {
                console.log("Move placed.");
                break;
            }
        }
    }

    const playGame = () => {
        let moves = 0;
        let incrementVal = 1
        while (true) {
            printPlayerTurn(turn);

            console.log("Where would you like to place the symbol? (give coordinates)")
            const row = prompt("Enter row: ");
            const column = prompt("Enter column: ");

            playRound(row, column);
            const winner = gameBoard.detectWinner(row, column, incrementVal);

            if (winner !== false) {
                console.log(`The winner is ${turn.getName()}`)
                break;
            } else if (moves >= 9) {
                console.log("Tie!");
                break;
            } else {
                alternateTurns();
                incrementVal *= -1;
                moves++;
            }
        }
    }

    return {
        playRound,
        playGame,
    }
})();


controller.playGame();