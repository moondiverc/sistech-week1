window.addEventListener('DOMContentLoaded', () => {
    // mengambil elemen-elemen yang dibutuhkan
    const blocks = Array.from(document.querySelectorAll('.block'));
    const playerDisplay = document.querySelector('.display');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.display-announce');

    // variabel
    let board = ['', '', '', '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let isActive = true;

    const playerXwin = 'playerXwin';
    const playerOwin = 'playerOwin';
    const tie = 'tie';

    // array berisi kombinasi blok untuk menang
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

    // fungsi announcement
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

    // fungsi untuk menangani result valid
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

        // jika ada yang menang
        if (isWin) {
            announcement(currentPlayer === 'X' ? playerXwin : playerOwin);
            playerDisplay.classList.add('hide');
            isActive = false;
            return;
        }

        // jika tie
        if (!board.includes('')) {
            announcement(tie);
            playerDisplay.classList.add('hide');
        }
    }

    // fungsi untuk mengecek blok valid(kosong)
    const isValid = (block) => {
        if (block.innerText === 'X' || block.innerText === 'O') {
            return false;
        }
        return true;
    }

    // fungsi untuk mengupdate board
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // fungsi untuk mengganti player
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerHTML = `Player <span class="player${currentPlayer}">${currentPlayer}</span>'s turn`;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    // fungsi untuk aksi yang dilakukan user
    const userAction = (block, index) => {
        if (isValid(block) && isActive) {
            block.innerText = currentPlayer;
            block.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValid();
            changePlayer();
        }
    };

    // fungsi untuk mereset board
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
            playerDisplay.classList.remove('hide');
        })
    }

    // event listener untuk memulai permainan
    blocks.forEach( (block, index) => {
        block.addEventListener('click', () => userAction(block, index));
    });

    // event listener untuk reset button
    resetButton.addEventListener('click', resetBoard);
});