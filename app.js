

const game = (function () {

    const gameBoard = (function() {

        // const boardContainer = document.querySelector('.gameboard')
        const allPlayUnits = document.querySelectorAll('.play-unit')
    
        function clearBoard() {
            allPlayUnits.forEach(div => div.textContent = '')
        }
    
    
        return {
            clearBoard
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
        }
        
        function win() {
            console.log(`Congratulations, ${name}! You have won!`);
        }

        return { name, symbol}
    }

    startGame()
    
    function startGame() {
        gameBoard.clearBoard()
    }
    
    
    
    return {

    }
})();
