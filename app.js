const game = (function () {
    
    const allPlayUnits = document.querySelectorAll('.play-unit')
    
    let roundNumber = 1

    const gameBoard = (function() {

        function updateBoardOnPlay() {
            allPlayUnits.forEach(div => div.addEventListener('DOMCharacterDataModified', () => console.log('test')))
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
        let gameCounter = 0

        function getName() {
            return name
        }
        
        function play() {
            this.textContent = symbol
            gameBoard.nextRound()
            console.log(this);
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

    
    function startGame() {
        gameBoard.clearBoard()
    }
    
    startGame()
    gameBoard.updateBoardOnPlay()
    // const player1 = playerFactory(prompt('Player 1 name'), 'O')
    // const player2 = playerFactory(prompt('Player 2 name'), 'O')
    const player1 = playerFactory('Murillo', 'O')
    const player2 = playerFactory('Érica', 'X')


    allPlayUnits.forEach(div => div.addEventListener('click', gameBoard.playRound))

    return {

    }
})();
