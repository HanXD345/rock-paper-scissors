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
    const createBoard = () => {
        clearBoard();
        console.log(gameBoard);
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                const cell = Cell()
                cell.changeValue("*")
                row.push(cell)
            }
            gameBoard.push(row);
        }
    }

    const clearBoard = () => gameBoard.splice(0, gameBoard.length);

    // Displays the game board without any modifications
    // (simply as an array)
    const getBoard = () => gameBoard;

    // Replaces the placeholder symbol with the player's
    // symbol given user input (row and column)
    const insertChoice = (row, column, symbol) => {
        gameBoard[row][column].changeValue(symbol);
    }

    // Hashmap/Object representing locations in the
    // tic tac toe game. (3 rows, 3 columns, 2 diagonals)
    let locations = {
        rows: [0, 0, 0],
        columns: [0, 0, 0],
        diagonals: [0, 0],
    }

    const resetLocations = () => {
        locations = {
            rows: [0, 0, 0],
            columns: [0, 0, 0],
            diagonals: [0, 0],
        }
    }

    let winner = false;

    const resetWinner = () => {
        winner = false;
    }

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
        createBoard,
        insertChoice,
        resetLocations,
        detectWinner,
        resetWinner,
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
    const changeName = (newName) => {
        name = newName;
    }

    return {
        getName,
        getSymbol,
        changeName,
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
    let moves = 0;
    const board = gameBoard;
    board.createBoard();

    // Gets the current player's turn
    const getTurn = () => turn;
    
    // Gets the current number of moves made
    const getMoves = () => moves;

    // Increments number of moves
    const incrementMoves = () => moves++;

    // Creates a modal for when the user opens the website
    // for the first time in order to input names
    const getModal = () => {
        const modal = document.querySelector("dialog");
        modal.showModal();
        
        const submitButton = document.querySelector("[type='submit']");

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            const form = document.querySelector("form");
            const formData = new FormData(form);

            const playerOneName = formData.get('playerOneName');
            const playerTwoName = formData.get('playerTwoName');

            player1.changeName(playerOneName);
            player2.changeName(playerTwoName);

            modal.close();
            form.reset();

            const names = document.querySelector(".player-names");
            names.textContent = "";
            names.textContent = `Player One Name: ${player1.getName()} (${player1.getSymbol()}), 
                                    Player Two Name: ${player2.getName()} (${player2.getSymbol()})`;

            printPlayerTurn(turn);
        })
    }

    // Toggles the turn after each round
    const alternateTurns = () => {
        turn = turn === player1 ? player2 : player1;
        return;
    };

    // Displays the game board (formatted) as
    // well as the current player's turn.
    const printPlayerTurn = (player) => {
        const turnMessage = document.querySelector(".turn-message");
        turnMessage.textContent = `${player.getName()}'s Turn`;
    }

    const printEndGameMessage = (player) => {
        const endGameMessage = document.querySelector(".end-game-message");
        endGameMessage.textContent = player === null ? "Tie!" : `${player.getName()} (${player.getSymbol()}) is the winner!`;
    }

    // Plays a single round of tic tac toe (console)
    const playRound = (row, column) => {
        gameBoard.insertChoice(row, column, turn.getSymbol()); 
    }

    // Plays multiple rounds of tic tac toe until
    // one of the players win, or if there's a tie
    const playGame = () => {
        let incrementVal = 1;
        gameDisplay.getGrid();
        getModal();
        board.resetLocations();
        board.createBoard();
        moves = 0;
        let gameEnded = false;

        const ticTacToeSpots = document.querySelectorAll(".spot");

        for (let spot of ticTacToeSpots) {
            spot.addEventListener("click", (event) => {
                if (!gameEnded) {
                    event.preventDefault();
                    if (spot.textContent === "") {
                        const location = gameDisplay.changeSpot(spot, turn);
                        const row = location[0];
                        const column = location[1];
        
                        playRound(row, column);
        
                        const winner = gameBoard.detectWinner(row, column, incrementVal);
    
                        if (winner !== false) {
                            printEndGameMessage(getTurn());
                            gameEnded = true;
                        } else if (getMoves() === 8) {
                            printEndGameMessage(null);
                            gameEnded = true;
                        } else {
                            alternateTurns();
                            printPlayerTurn(getTurn());
                            incrementVal *= -1;
                            incrementMoves();
                        }
                    } else {
                        console.log("Invalid Move. There's already a symbol there.")
                    }
                }
            })
        }

        const resetButton = document.querySelector(".reset-button");

        resetButton.addEventListener("click", () => {
            gameEnded = false;
            board.resetWinner();
            playGame();
        })
    }

    return {
        playGame,
    }
})();

const gameDisplay = (function gameDisplay() {
    const container = document.querySelector(".container");

    const getGrid = () => {
        container.textContent = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const ticTacToeSpot = document.createElement("div");
                ticTacToeSpot.setAttribute("class", `row-${i} column-${j} spot`);
                ticTacToeSpot.textContent = "";
                container.appendChild(ticTacToeSpot);
            }
        }
    }

    const changeSpot = (spot, player) => {
        spot.textContent = player.getSymbol();
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

    return {
        getGrid,
        changeSpot,
    }
})();

controller.playGame();