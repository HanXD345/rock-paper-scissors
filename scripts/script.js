const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    let gameBoard = [];

    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < columns; j++) {
            row.push(0);
        }
        gameBoard.push(row);
    }

    return {
        gameBoard
    };
})();

console.log(gameBoard);