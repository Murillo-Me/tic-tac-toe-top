const game = (function () {
    
    const allPlayUnits = document.querySelectorAll('.play-unit')
    
    let roundNumber = 1
    let totalTime = 0

    const gameBoard = (function() {

        const boardSymbolArray = new Array(9).fill(null)

        function updateBoardOnPlay(index, symb) {
            this.innerHTML = symb
            boardSymbolArray[index] = symb
            boardSymbolArray.forEach((symbol, i) => {
                if (symbol == null) return
                (symbol == players[0].symbol) ? players[0].boardArray[i] = 1 : players[1].boardArray[i] = 1
            })
        }

        function clearBoard() {
            allPlayUnits.forEach(div => div.textContent = '')
        }    

        function nextRound() {
            roundNumber++
        }

        function playRound(e) {
            let player = null

            if (roundNumber % 2 != 0) {
                player = players[0];
            } else {
                player = players[1];
            }

            player.play.call(e.currentTarget);

            const isWin = checkWin(player.boardArray)
            if (!isWin) return
            if (isWin == true) {
                player.win()
                console.log(player.winCounter);
                reset()
                updateScore()
                return
            }
            if (isWin == 'DRAW') {
                displayMessage("It's a draw! Play another round.",2000)
                reset()
                return
            }
        }

        function reset() {
            for (let i = 0; i < boardSymbolArray.length; i++) {
                boardSymbolArray[i] = null;
            }
            roundNumber = 1
            players.forEach(player => player.resetBoard());
            allPlayUnits.forEach(div => div.textContent = '');
            totalTime = 0
        }

        function checkWin(boardArray) {
            // CHECK WIN ON FIRST ROW
            if (roundNumber < 3) return false

            if (boardArray[0] + boardArray[1] + boardArray[2] == 3 ||
                boardArray[3] + boardArray[4] + boardArray[5] == 3 ||
                boardArray[6] + boardArray[7] + boardArray[8] == 3 ||
                boardArray[0] + boardArray[3] + boardArray[6] == 3 ||
                boardArray[1] + boardArray[4] + boardArray[7] == 3 ||
                boardArray[2] + boardArray[5] + boardArray[8] == 3 ||
                boardArray[0] + boardArray[4] + boardArray[8] == 3 ||
                boardArray[2] + boardArray[4] + boardArray[6] == 3) return true

            if (roundNumber == 10) {
                return 'DRAW'
            }
        }

        function updateScore() {
            const playersScore = document.querySelectorAll('.player-score')
            playersScore.forEach((playerScore, i) => playerScore.textContent = `Score: ${players[i].winCounter}`)
        }
    
        return {
            clearBoard,
            nextRound,
            playRound,
            updateBoardOnPlay,
            updateScore
        }
    })();

    const playerFactory = (name, symbol) => {

        let winCounter = 0
        const boardArray = new Array(9).fill(null)

        function getName() {
            return name
        }
        
        function play() {
            gameBoard.updateBoardOnPlay.call(this,this.getAttribute('data-key'), symbol)
            gameBoard.nextRound()
        }
        
        function win() {
            displayMessage(`Congratulations, ${name}! You have won!<br>Play another round.<br>Win 3 rounds to win it all!`,2000)
            console.log('player won');
            console.log(winCounter);
            winCounter += 1;
        }

        function resetBoard() {
            for (let i = 0; i < boardArray.length; i++) {
                boardArray[i] = null;
            }
        }

        function isWinner() {
            return (winCounter == 3)
        }

        return { name, symbol, boardArray, play, win, isWinner, winCounter, resetBoard}
    }

    function displayMessage(message, messageTime) {
        const popUp = document.querySelector('.pop-up')
        
        setTimeout(() => {
            popUp.classList.toggle('active')
            popUp.innerHTML = `<span>${message}</span>`
        }, totalTime)

        totalTime += messageTime
        setTimeout(() => {
            popUp.classList.toggle('active')
        }, totalTime)
    }

    function displayForm(numberOfInputs, message, chooseWeapon = false) {
        
        setTimeout(() => {
            const popUp = document.querySelector('.pop-up')
            popUp.classList.toggle('active')
            popUp.textContent = ''
            
            icons = ['<i class="fas fa-gavel fa-2x"></i>', '<i class="fas fa-record-vinyl fa-2x"></i>']

            for (let i = 0; i < numberOfInputs; i++) {
                if (!chooseWeapon) {
                popUp.innerHTML += `
                <label>${message[i]}</label>
                <input type="text"></input>
                `
                } else {
                    popUp.innerHTML += `
                <label>${message[i]}</label>
                <input type="text"></input>
                <button class="symbol-picker" tabindex="-1">${icons[i]}</button>
                `
                }
            }

            popUp.innerHTML += '<button class="play-button">Play!</button>'
            const chooseWeaponBtn = popUp.querySelectorAll('button.symbol-picker')
            chooseWeaponBtn.forEach(btn => btn.addEventListener('click',swapSymbol))

        }, totalTime)
    }

    let iconIndex = 0

    function swapSymbol() {
        const allSymbolBtns = document.querySelector('.pop-up').querySelectorAll('button.symbol-picker')
        const aux = icons[iconIndex]

        if (this == document.querySelector('.pop-up').querySelectorAll('button.symbol-picker')[iconIndex]) {
                    allSymbolBtns[iconIndex].innerHTML = icons[1 - iconIndex]
                    allSymbolBtns[1 - iconIndex].innerHTML = icons[iconIndex]
                    icons[iconIndex] = icons[1 - iconIndex]
                    icons[1 - iconIndex] = aux
        } else {
            allSymbolBtns[1- iconIndex].innerHTML = icons[iconIndex]
            allSymbolBtns[iconIndex].innerHTML = icons[1 - iconIndex]
            icons[iconIndex] = icons[1 - iconIndex]
            icons[1 - iconIndex] = aux
        }
    }
    
    function startGame() {
        gameBoard.clearBoard()
        displayMessage('Welcome! Are you ready for game of Tic-Tac-Toe?', 2000)
        displayMessage('Then, pick your name and your weapon!', 2000)
        startPlayers()
        totalTime = 0
    }

    function startPlayers() {
        displayForm(2, ['Player 1 name:', 'Player 2 name:'], true)
        const popUp = document.querySelector('.pop-up');
        ['keydown', 'click'].forEach(evt => {
            popUp.addEventListener(evt, (e) => {
                if (e.keyCode == 13 || e.target == popUp.querySelector('button.play-button')) {
                    const inputBoxes = popUp.querySelectorAll('input[type="text"]')
                    const symbolSelection = popUp.querySelectorAll('button.symbol-picker')
                    const allPlayerName = document.querySelectorAll('.player-info h2')
                    const allScoreSpan = document.querySelectorAll('span.player-score')
                    inputBoxes.forEach((input, i) => {
                        players.push(playerFactory(input.value,symbolSelection[i].innerHTML))
                        allPlayerName[i].textContent = players[i].name
                        allScoreSpan[i].textContent = `Score: ${players[i].winCounter}`
                        const symbolDisplays = document.querySelectorAll('span.player-symbol')
                        symbolDisplays.forEach((span, i) => span.innerHTML = symbolSelection[i].innerHTML)
                    })
                    popUp.classList.toggle('active')
                    popUp.textContent = ''
                    document.querySelectorAll('.player-info').forEach(div => div.classList.toggle('active'))
                }
            }, false)
        })

    }
    
    startGame()
    const players = []

    allPlayUnits.forEach(div => div.addEventListener('click', gameBoard.playRound))

    return {
        
    }
})();
