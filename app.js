const game = (function () {
    
    const allPlayUnits = document.querySelectorAll('.play-unit')
    
    let roundNumber = 1
    let totalTime = 0

    const gameBoard = (function() {

        const boardArray = new Array(9).fill(null)

        function updateBoardOnPlay(index, symb) {
            console.log(this);
            this.textContent = symb
            boardArray[index] = symb
        }

        function clearBoard() {
            allPlayUnits.forEach(div => div.textContent = '')
        }    

        function nextRound() {
            roundNumber++
        }

        function playRound(e) {
            (roundNumber % 2 == 0) ? player1.play.call(e.currentTarget) : player2.play.call(e.currentTarget)
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

    const playerFactory = (name, symbol='X') => {

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
                <button>${icons[i]}</button>
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
        displayMessage('Then, pick your weapon and your name!', 2000)
        displayForm(2, ['Player 1 name:', 'Player 2 name:'], true)
    }
    
    startGame()
    const player1 = playerFactory('Murillo', 'O')
    const player2 = playerFactory('Érica', 'X')


    allPlayUnits.forEach(div => div.addEventListener('click', gameBoard.playRound))

    return {
        
    }
})();
