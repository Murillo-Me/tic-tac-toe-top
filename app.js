const game = (function () {
    
    const allPlayUnits = document.querySelectorAll('.play-unit')
    
    let roundNumber = 1
    let totalTime = 0

    const gameBoard = (function() {

        const boardArray = new Array(9).fill(null)

        function updateBoardOnPlay(index, symb) {
            console.log(this);
            this.innerHTML = symb
            boardArray[index] = symb
        }

        function clearBoard() {
            allPlayUnits.forEach(div => div.textContent = '')
        }    

        function nextRound() {
            roundNumber++
        }

        function playRound(e) {
            (roundNumber % 2 != 0) ? players[0].play.call(e.currentTarget) : players[1].play.call(e.currentTarget)
            checkWin()
        }

        function checkWin() {
            if (roundNumber == 10) {
                console.log('game over');
                player1.win()
                console.log(player1.isWinner());
            }
        }
    
        return {
            clearBoard,
            nextRound,
            playRound,
            updateBoardOnPlay
        }
    })();

    const playerFactory = (name, symbol) => {

        let winCounter = 0
        let playCounter = 0

        function getName() {
            return name
        }
        
        function play() {
            gameBoard.updateBoardOnPlay.call(this,this.getAttribute('data-key'), symbol)
            gameBoard.nextRound()
            playCounter++
        }
        
        function win() {
            console.log(`Congratulations, ${name}! You have won!`);
            winCounter++;
            roundNumber = 1
        }

        function isWinner() {
            return (winCounter == 3)
        }

        return { name, symbol, play, win, isWinner, winCounter}
    }

    function displayMessage(message, messageTime) {
        const popUp = document.querySelector('.pop-up')
        const span = popUp.querySelector('span')
        
        setTimeout(() => {
            popUp.classList.toggle('active')
            span.textContent = message
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

            const chooseWeaponBtn = popUp.querySelectorAll('button')
            chooseWeaponBtn.forEach(btn => btn.addEventListener('click',swapSymbol))

        }, totalTime)
    }

    let iconIndex = 0

    function swapSymbol() {
        const allSymbolBtns = document.querySelector('.pop-up').querySelectorAll('button')
        const aux = icons[iconIndex]

        if (this == document.querySelector('.pop-up').querySelectorAll('button')[iconIndex]) {
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
        
    }

    function startPlayers() {
        displayForm(2, ['Player 1 name:', 'Player 2 name:'], true)
        const popUp = document.querySelector('.pop-up')
        popUp.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                const inputBoxes = popUp.querySelectorAll('input[type="text"]')
                const symbolSelection = popUp.querySelectorAll('button.symbol-picker')
                inputBoxes.forEach((input, i) => {
                    console.log(input.value)
                    console.log(symbolSelection[i]);
                    players.push(playerFactory(input.value,symbolSelection[i].innerHTML))
                })
                popUp.classList.toggle('active')
                popUp.textContent = ''
            }
        })
    }
    
    startGame()
    const players = []

    allPlayUnits.forEach(div => div.addEventListener('click', gameBoard.playRound))

    return {
        
    }
})();
