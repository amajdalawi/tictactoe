'use strict';

(() => {
    let playerFactory = (num_of_player) => {
        // A player factory object should have: {p.turn, p.num, p.wins, p.incrementWins()}
        let turn = num_of_player == 1 ? 'X' : 'O';
        let num = num_of_player;
        let wins= 0;

        let winsDiv = document.querySelector(`.wins.p${num}`);
        winsDiv.innerHTML = wins;

        let incrementWins = () => {
            wins += 1;
            winsDiv.innerHTML = wins;
        }

        return {turn, num, wins, incrementWins};

    }

    let p1 = playerFactory(1);
    let p2 = playerFactory(2);

    let ties = (() => {
        let tiesDiv = document.querySelector('.ties-info');
        tiesDiv.innerHTML = 0;
        let numOfTies = parseInt(tiesDiv.innerHTML)
        let resetTies = () => {
            tiesDiv.innerHTML = 0;
            numOfTies = 0;
        }

        let incrementTies = () => {
            numOfTies += 1;
            tiesDiv.innerHTML = numOfTies;
        }

        return {numOfTies,tiesDiv,resetTies,incrementTies};


    })();

    (() => {
        let arrayBoard = [['','',''],['','',''],['','','']];
        let gridItems = document.querySelectorAll('.grid-item');
        let currentP = p1;


        let changeTurn = () => {
            // Changes the turn of the player
            if (currentP.turn === 'X') {
                currentP = p2;
            } else {
                currentP = p1;
            }
        };


        let checkIfWin = () => {

            let transposeArray = function(array) {
                let newArray = [];

                let oldArrayLength = array.length;

                for (let i = 0; i < oldArrayLength; i++) {
                    newArray.push([]);
                }

                for (let i = 0; i < oldArrayLength; i++) {
                    for (let j = 0; j<newArray.length; j++) {
                        newArray[i].push(array[j][i])
                    }
                }

                console.log(newArray);
                return  newArray
            }

            for (const x of arrayBoard) {
                if (x[0] == x[1] && x[1] == x[2] && x[0] !== '') {
                    return true;
                }
            }

            for (const x of transposeArray(arrayBoard)) {
                if (x[0] == x[1] && x[1] == x[2] && x[0] !== '') {
                    return true;
                }
            }
            
            if ((arrayBoard[1][1] != '' ) && (
                (arrayBoard[0][0] === arrayBoard[1][1] && arrayBoard[1][1] === arrayBoard[2][2]) || 
                (arrayBoard[0][2] === arrayBoard[1][1] && arrayBoard[1][1] === arrayBoard[2][0])
                )) {
                return true
            }

            
        };

        let checkIfFUll = () => {
            let sum = 0;
            for (const i of [0,1,2]) {
                for (const j of [0,1,2]) {
                    if (arrayBoard[i][j] !== '') {
                        sum += 1
                    }
                }
            }
            return sum
        }
        let resetBoard = (grid) => {
            
            for (const x of arrayBoard) {
                for (let i = 0; i < x.length; i++) {
                    x[i] = '';
                }
            }
        
            for (const div of grid) {
                div.innerHTML = '';
            }
        };

        let removeEventListener = (gridDiv) => {
            gridDiv.removeEventListener('click')
        }

        for (let i = 0; i < gridItems.length; i++) {
            gridItems[i].addEventListener('click', () => {
                if (gridItems[i].innerHTML === '') {
                    gridItems[i].innerHTML = currentP.turn;
                    arrayBoard[Math.floor(i/3)][i % 3] = currentP.turn;
                    console.log(arrayBoard)
                    if(checkIfWin()) {
                        currentP.incrementWins();
                        resetBoard(gridItems);
                    } else {
                        changeTurn();

                    }

                }
                if (checkIfFUll() === 9) {
                    console.log(checkIfFUll())
                    ties.incrementTies();
                    resetBoard(gridItems);
                }
                
            })
        }
        console.log(gridItems);

    })();
})();