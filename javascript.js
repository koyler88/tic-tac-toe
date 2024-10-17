function Gameboard()  {
    rows = 3;
    columns = 3;
    board = [];
    cell = 0;


    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const players = [
        {
            name: "Player One",
            token: "X"
        },
        {
            name: "Player Two",
            token: "O"
        }
    ]

    let activePlayer = players[0]

    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        }
        else {
            activePlayer = players[0]
        }
    }

    const getActivePlayer = () => activePlayer;

    const placeMarking = (row, column, player) => {
        if ((board[row][column].getValue()) === "") {
            board[row][column].addMarking(player)
            switchPlayer()
        }

    }

    const checkForWin = () => {
        if (board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue() && board[2][2].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue() && board[2][0].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[0][0].getValue() === board[0][1].getValue() && board[0][1].getValue() === board[0][2].getValue() && board[0][2].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[1][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[1][2].getValue() && board[1][2].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[2][0].getValue() === board[2][1].getValue() && board[2][1].getValue() === board[2][2].getValue() && board[2][2].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[0][0].getValue() === board[1][0].getValue() && board[1][0].getValue() === board[2][0].getValue() && board[2][0].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[0][1].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][1].getValue() && board[2][1].getValue() != "") {
            switchPlayer()
            return true;
        }
        if (board[0][2].getValue() === board[1][2].getValue() && board[1][2].getValue() === board[2][2].getValue() && board[2][2].getValue() != "") {
            switchPlayer()
            return true;
        }
    }

    const checkForTie = () => {
        if (board[0][0].getValue() != '' &&
        board[0][1].getValue() != '' &&
        board[0][2].getValue() != '' &&
        board[1][0].getValue() != '' &&
        board[1][1].getValue() != '' &&
        board[1][2].getValue() != '' &&
        board[2][0].getValue() != '' &&
        board[2][1].getValue() != '' &&
        board[2][2].getValue() != '') {
            return true;
        }
    }

    return {
        getBoard,
        placeMarking,
        getActivePlayer,
        switchPlayer,
        checkForWin,
        checkForTie
    };
}


function Cell() {
    let value = "";

    const addMarking = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMarking,
        getValue
    };
}

function GameController() {

    const board = Gameboard()

    const playRound = (row, column) => {
        board.placeMarking(row, column, board.getActivePlayer().token)
    }

    return {
        playRound,
        getBoard: board.getBoard,
        getActivePlayer: board.getActivePlayer,
        checkForWin: board.checkForWin,
        checkForTie: board.checkForTie
    }
}

function screenController() {
    const game = GameController()
    const turn = document.querySelector(".turn")
    const boardDiv = document.querySelector(".board")
    const status = document.querySelector(".status")
    const restart = document.querySelector(".restart")

    function setupNewGame() {
        window.location.reload()
    }

    const updateScreen = () => {
        boardDiv.textContent = ""


        const board = game.getBoard()
        const player = game.getActivePlayer()

        turn.textContent = `${player.name}'s Turn (${player.token})`

        let rowNumber = 0;

        board.forEach(row => {
            row.forEach((cell, index) => {
              const cellButton = document.createElement("button");
              cellButton.classList.add("cell");
              cellButton.dataset.column = index
              cellButton.dataset.row = rowNumber
              cellButton.textContent = cell.getValue();
              boardDiv.appendChild(cellButton);
            })
            rowNumber += 1;
          })
        }
        
        function handleClick(e) {
            const selectedColumn = e.target.dataset.column
            const selectedRow = e.target.dataset.row

            if (!selectedColumn || !selectedRow) return;

            game.playRound(selectedRow, selectedColumn)
            if (game.checkForWin()) {
                status.textContent = `${game.getActivePlayer().name} Wins!`
                updateScreen()
                turn.textContent = "Game Over!"
                boardDiv.removeEventListener("click", (handleClick))
            }
            else if (game.checkForTie()) {
                status.textContent = "Tie game!"
                updateScreen()
                turn.textContent = "Game Over!"
                boardDiv.removeEventListener("click", (handleClick))
            }
            else {
                updateScreen()
            }
        }

        boardDiv.addEventListener("click", (handleClick))

        restart.addEventListener("click", () => {
            setupNewGame()
        })

        updateScreen();
    }

    screenController();





