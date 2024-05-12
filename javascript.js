const tic_tac_toe = {
    board: ['','','','','','','','',''],
    simbols:{
        options: ['X', 'O'],
        turn_index: 0,
        change: function() {
            this.turn_index = this.turn_index === 0 ? 1 : 0;
        }
    },
    container_element: null,
    game_over: false,
    winning_sequence: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    init: function(container) {
        this.container_element = container;
    },

    victories: {
        X: 0,
        O: 0
    },

    make_play: function(position) {
        if(this.game_over) return false;
        if(this.board[position] === '') {
            this.board[position] = this.simbols.options [this.simbols.turn_index]
            this.draw()
            let winning_sequence_index = this.check_winning_sequece (this.simbols.options [ this.simbols.turn_index ]);
            if(winning_sequence_index >= 0) {
                this.game_is_over();
            } else {
                this.simbols.change();
                this.showCurrentPlayerTurn(); 
            }
            return true;
        } else {
            return false;
        }
    },

    game_is_over: function() {
        this.game_over = true;
    },

    is_game_over() {
        return !this.board.includes('');
    },

    start: function() {
        this.board.fill('');
        this.draw();
        this.game_over = false;
        this.showCurrentPlayerTurn();
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            alert('este jogo foi reiniciado!')
        } else if (confirm('Tem certeza que quer reiniciar?')) {
            this.start();
            alert('este jogo foi reiniciado!')
        }
    },

    check_winning_sequece: function(simbols) {
        for(i in this.winning_sequence) {
            if( this.board[this.winning_sequence[i][0] ] == simbols &&  
                this.board[this.winning_sequence[i][1] ] == simbols &&
                this.board[this.winning_sequence[i][2] ] == simbols) {
                    this.victories[simbols]++;
                    this.updateWinCounters();
                    alert(`O vencedor é o ${simbols}`);
                    return i;  
                }
        };
        return -1;
    },

    updateWinCounters: function() {
        const playerXElement = document.getElementById('playerXWins');
        const playerOElement = document.getElementById('playerOWins');
        playerXElement.textContent = this.victories.X;
        playerOElement.textContent = this.victories.O;
    },

    draw: function() {
        let content = '';

        for(i in this.board){
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>'
        }

        this.container_element.innerHTML = content
    },

    showCurrentPlayerTurn: function() {
        const turnPlayer = document.querySelector('.player');
        const currentPlayerSymbol = this.simbols.options[this.simbols.turn_index];
        turnPlayer.textContent = currentPlayerSymbol;
        turnPlayer.classList.remove('playerX', 'playerO');
        turnPlayer.classList.add(`player${currentPlayerSymbol}`);
    }
}