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

    // Hashmap/Object representing locations in the
    // tic tac toe game. (3 rows, 3 columns, 2 diagonals)
    const locations = {
        rows: [0, 0, 0],
        columns: [0, 0, 0],
        diagonals: [0, 0],
    }

    let winner = false;

    // Detects the winner of a tic tac toe game.
    // Logic: we can think of the grid in tic tac toe
    // as a grid of values, with each player representing
    // a value (say 1 and -1). A hashmap (or an object in this case)
    // is set up with row, column, and diagonal arrays. As soon as
    // the player places their symbol in a specific row and column,
    // the respective row/column/diagonal array is 
    // incremented/decremented accordingly. A player wins if 
    // one of the values in the array is 3 or -3. This is the case 
    // since we're checking to see if a specific symbol is present 
    // in a whole row/column/diagonal.
    const detectWinner = (row, column, incrementVal) => {
        locations.rows[row] += incrementVal;
        locations.columns[column] += incrementVal;

        if (row === column) {
            locations.diagonals[0] += incrementVal;
        }
        
        if ((row == column && column == 1) || ((row == 0 && column == 2) || (row == 2 && column == 0))) {
            locations.diagonals[1] += incrementVal;
        }

        Object.values(locations).forEach((array) => {
            if (array.includes(3) || array.includes(-3)) {
                winner = true;
            }
        })

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

    // Plays multiple rounds of tic tac toe until
    // one of the players win, or if there's a tie
    // (console)
    const playGame = () => {
        let moves = 0;
        let incrementVal = 1;
        gameDisplay.getGrid();

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
            } else if (moves === 9) {
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
        playGame,
    }
})();

const gameDisplay = (function gameDisplay() {
    const container = document.querySelector(".container");

    const getGrid = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const ticTacToeSpot = document.createElement("div");
                ticTacToeSpot.setAttribute("class", `row-${i} column-${j} spot`);
                container.appendChild(ticTacToeSpot);
            }
        }
    }

    const getRowAndColumn = (spot) => {
        const spotAttributes = spot.classList.value.split(" ");
        let location = [];
        for (let i = 0; i < spotAttributes.length; i++) {
            if (spotAttributes[i].slice(0, 3) === "row") {
                location.push(spotAttributes[i].at(-1));
            } else if (spotAttributes[i].slice(0, 3) === "col") {
                location.push(spotAttributes[i].at(-1));
            }
        }

        return location;
    }

    const getChoice = (player) => {
        const ticTacToeSpots = document.querySelectorAll(".spot");

        for (let spot of ticTacToeSpots) {
            spot.addEventListener("click", () => {
                if (spot.textContent !== "") {
                    spot.textContent = player.getSymbol();
                    const location = getRowAndColumn(spot);
                }
            })
        }
    }

    return {
        getGrid,
        getRowAndColumn,
    }
})();