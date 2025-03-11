let sudokuBoard = document.getElementById("sudokuBoard");
let limpiar = document.getElementById("limpiar");
let validar = document.getElementById("validar");
let enviar = document.getElementById("enviar");
let dialog = document.getElementById("dialog");
let difficultButton = document.getElementsByClassName("dialogButton");
let game = document.getElementById("game");
let easy = document.getElementById("easyButton");
let medium = document.getElementById("mediumButton");
let hard = document.getElementById("hardButton");

const defaultBoard = [[5,3,0,0,7,0,0,0,0],
                      [6,0,0,1,9,5,0,0,0],
                      [0,9,8,0,0,0,0,6,0],
                      [8,0,0,0,6,0,0,0,3],
                      [4,0,0,8,0,3,0,0,1],
                      [7,0,0,0,2,0,0,0,6],
                      [0,6,0,0,0,0,2,8,0],
                      [0,0,0,4,1,9,0,0,5],
                      [0,0,0,0,8,0,0,7,9]]

const easyBoard = [[2,5,9,0,1,8,7,3,6],[0,6,1,2,7,3,5,0,9],[0,0,0,9,6,0,0,2,0],[0,1,3,0,8,7,0,9,2],[0,0,0,0,0,2,0,1,7],[7,0,0,1,4,9,3,0,5],[0,7,5,8,9,4,2,6,3],[0,0,0,0,2,6,0,5,0],[6,0,2,0,5,1,0,7,8]]
const mediumBoard = [[1,0,4,0,0,5,0,0,2],[0,0,7,0,6,0,0,0,1],[0,8,0,7,4,1,3,5,9],[0,5,0,4,7,8,1,0,6],[6,0,0,0,2,3,0,4,0],[0,4,0,9,0,6,0,0,7],[9,6,3,0,1,0,8,0,5],[7,0,0,0,3,9,0,1,0],[0,0,0,0,8,7,9,0,0]]
const hardBoard = [[0,0,0,0,0,0,0,7,0],[0,1,0,0,0,7,0,0,6],[0,7,0,6,3,1,2,8,9],[6,9,0,3,0,8,0,1,0],[0,2,0,0,0,0,8,9,0],[0,8,3,0,0,9,0,0,0],[7,0,8,4,9,6,1,0,5],[0,0,1,0,2,5,3,0,8],[0,0,0,0,1,0,0,4,0]]


function createBoardPage(board)
{
    sudokuBoard.innerHTML = "";
    for(let i = 0; i < 9; i++)
    {
        const row = sudokuBoard.insertRow(i);
        if (i % 3 ==2)
        {
            row.classList.add("bottomBorder");
        }

            for(let j = 0; j < 9; j++)
            {
                    const celda = row.insertCell(j);
                    celda.style.border = "1px solid black";
                    if (j % 3 == 2)
                    {
                        celda.classList.add("rightBorder");
                    }
                    if (i < 3) {
                        if (j < 3) celda.classList.add("boxOne");
                        if (j >5 && j < 9) celda.classList.add("boxThree");
                    } else if (i < 6) {
                        if (j > 2 && j < 6) celda.classList.add("boxFive");
                    } else if (i < 9) {
                        if (j < 3) celda.classList.add("boxSeven");
                        if (j > 5 && j < 9) celda.classList.add("boxNine");
                    }
                    const input = document.createElement("input");
                    input.style.width = "50px";
                    input.style.height = "50px";
                    input.id ="sudoku_Td"
                    input.value = board[i][j] === 0 ?  " " : board[i][j];
                    input.disabled = board[i][j] !== 0;
                    celda.appendChild(input);
                    row.appendChild(celda);
            }
        sudokuBoard.appendChild(row);
    }
}


createBoardPage(defaultBoard);


function clearSudoku()
{
    let inputs = document.querySelectorAll("#sudokuBoard input")
    for(let i = 0; i < inputs.length; i++)
    {
        if(!inputs[i].disabled)
        {
            inputs[i].value = " ";
        }
    }
}


function getBoard()
{
    let actualBoard = [];
    let inputs = document.querySelectorAll("#sudokuBoard input");
    for(let i = 0; i < 9; i++)
    {
        let row = [];
        for (let j = 0; j < 9; j++)
        {
            let input = inputs[i * 9 + j];
            let value = input.value.trim();
            if(value === " ")
            {
                value = "0";
            }else{
                value = parseInt(value, 10);
            }
            row.push(value)
        }
        actualBoard.push(row);
    }
    return actualBoard;
}

function validateSudoku()
{
    let inputs = document.querySelectorAll("#sudokuBoard input");
    for(let i = 0; i < inputs.length; i++)
    {
        if(inputs[i].value === " ")
        {   
            alert("Hay campos vacios");
            return;
        }
    }

    let actualBoard = getBoard();

    if(isValidSudoku(actualBoard)){
        alert("Felicidades, la solucion es correcta!");
    }else{
        alert("Tienes errores en tu solucion");
    }
        
}


function isValidSudoku(board)
{
    function isValidGroup(group)
    {
        let existente = [];
        for (let num of group)
        {
            if (num !== "0" && existente.includes(num)){
                return false;
            }
            existente.push(num);
        }
        return true;
    }

    for(let i = 0; i < 9; i++)
    {
        let row = [];
        let column = [];
        for(let j = 0; j < 9; j++)
        {
            row.push(board[i][j]);
            column.push(board[j][i]);
        }
        if(!isValidGroup(row) || !isValidGroup(column))
            return false;
    }

    for(let i = 0; i < 9; i+=3)
    {
        for(let j = 0; j < 9; j+=3)
        {
            let miniGroup = [];
            for(let x = 0; x < 3; x++)
            {
                for(let y = 0; y < 3; y++)
                {
                    miniGroup.push(board[i+x][j+y])
                }
            }
            if(!isValidGroup(miniGroup))
                return false;
        }
    }
    return true;
}


function optionButton()
{
    if(game.value == "nuevaPartida")
        selectDifficult();
}


function selectDifficult()
{
    dialog.style.display= "block";
    easy.addEventListener("click", function(){
        createBoardPage(easyBoard);
        dialog.style.display="none";
    })
    medium.addEventListener("click", function(){
        createBoardPage(mediumBoard);
        dialog.style.display="none";
    })
    hard.addEventListener("click", function(){
        createBoardPage(hardBoard);
        dialog.style.display="none";
    })
    

}

validar.addEventListener("click", validateSudoku);
limpiar.addEventListener("click", clearSudoku);
enviar.addEventListener("click", optionButton);
