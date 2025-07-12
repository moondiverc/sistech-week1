window.addEventListener('DOMContentLoaded', () => {
    const blocks = Array.from(document.querySelectorAll('.block'));
    const playerDisplay = document.querySelector('.display');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.display-announce');

    let board = ['', '', '', '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let isActive = true;

    const playerXwin = 'playerXwin';
    const playerOwin = 'playerOwin';
    const tie = 'tie';

    const winArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const announcement = (type) => {
        switch(type) {
            case playerOwin:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Win!';
                break;
            case playerXwin:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Win!';
                break;
            case tie:
                announcer.innerHTML = 'Tie!';
        }
        announcer.classList.remove('hide');
    };

    function handleResultValid() {
        let isWin = false;
        for (let i = 0; i < winArrays.length; i++) {
            const winArray = winArrays[i];
            const a = board[winArray[0]];
            const b = board[winArray[1]];
            const c = board[winArray[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                isWin = true;
                break;
            }
        }

        if (isWin) {
            announcement(currentPlayer === 'X' ? playerXwin : playerOwin);
            isActive = false;
            return;
        }

        if (!board.includes('')) {
            announcement(tie);
        }
    }

    const isValid = (block) => {
        if (block.innerText === 'X' || block.innerText === 'O') {
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerHTML = `Player <span class="player${currentPlayer}">${currentPlayer}</span>'s turn`;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (block, index) => {
        if (isValid(block) && isActive) {
            block.innerText = currentPlayer;
            block.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValid();
            changePlayer();
        }
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '',];
        isActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        blocks.forEach(block => {
            block.innerText = '';
            block.classList.remove('playerX');
            block.classList.remove('playerO');
        })
    }

    blocks.forEach( (block, index) => {
        block.addEventListener('click', () => userAction(block, index));
    });

    resetButton.addEventListener('click', resetBoard);
});