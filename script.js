

const displayController =(()=>{
    const renderMessage =(message)=>{
document.querySelector("#message").innerHTML=message;
    }

    return{
        renderMessage,
    }
})


const Gameboard =(()=>{
let gameBoard=["","","","","","","","",""];

const render=()=>{
let boardHTML="";
gameBoard.forEach((square,index)=>{
boardHTML+=`<div class="square" id="square-${index}">${square}</div>`
})
document.querySelector("#gameboard").innerHTML=boardHTML; 
const squares= document.querySelectorAll(".square");
squares.forEach((square)=>{
square.addEventListener("click",Game.handleClick);
})
}


const update=(index,value)=>{
    gameBoard[index]=value;
    render();
}

const getgameBoard=()=>gameBoard;
return {
    render,
    update,
    getgameBoard
}
})();

const createPlayers =(name,mark)=>{

return {name,
    
        mark}

}

const Game =(()=>{
let players=[];
let currentPlayerIndex;
let gameOver;

const start=()=>{
    players=[createPlayers(document.querySelector("#player1").value,"X"),
            createPlayers(document.querySelector("#player2").value,"O")]

currentPlayerIndex=0;
gameOver=false;
Gameboard.render();
const squares= document.querySelectorAll(".square");
squares.forEach((square)=>{
square.addEventListener("click",handleClick);
})

}
const handleClick=(event)=>{
    if(gameOver){
        return;
    }
    let index=parseInt(event.target.id.split("-")[1]);
    if(Gameboard.getgameBoard()[index]!="")
    return;
    
    Gameboard.update(index,players[currentPlayerIndex].mark);
    if (checkForWin(Gameboard.getgameBoard(), players[currentPlayerIndex].mark)) {
        gameOver = true;
       // displayController.renderMessage(`${players[currentPlayerIndex].name} won!!!`)
        alert(`${players[currentPlayerIndex].name} won!!!`);
    }
   else if(checkForTie(Gameboard.getgameBoard())){
    gameOver=true;
    //displayController.renderMessage(`${players[currentPlayerIndex].name} won!!!`)
    alert(`It is a tie`);
   }
 if(currentPlayerIndex==0){
    currentPlayerIndex =1;}
    else currentPlayerIndex=0;

   
    
    
}
const restart=()=>{

    for(let i=0; i<9; i++){
        Gameboard.update(i,"");
    }
    Gameboard.render();
}


return {start,
    restart,
    handleClick
}
})();

const checkForWin=(board,mark)=>{
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
      ];
for(let i=0; i<winningCombinations.length; i++){

    const[a,b,c]=winningCombinations[i];
    if(board[a]==mark && board[a]==board[c] && board[a]==board[b]) return true; 
    
}

return false;
}
const checkForTie = (board) => {
    return board.every(square => square !== "")
  };
const restartButton=document.querySelector("#restart-button");
restartButton.addEventListener("click",()=>{
    Game.restart()
})

const startButton= document.querySelector("#start-button");
startButton.addEventListener("click",()=>{
    Game.start();

})