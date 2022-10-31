var gameboardId = document.getElementById("gameboard");
var PlayerPosition={
    X : 0,
    Y : 0,
};
var goals; 
var maxGoals

function move(x, y){
    let nextTile = document.getElementById((PlayerPosition.X+x) + "," + (PlayerPosition.Y+y));
    let currentTile = document.getElementById(PlayerPosition.X + "," + PlayerPosition.Y);
    let blockNextTile = document.getElementById((PlayerPosition.X+x*2) + "," + (PlayerPosition.Y+y*2));

    if(nextTile.classList.contains(Entities.Block)){        
        if(!(blockNextTile.classList.contains(Tiles.Wall)||blockNextTile.classList.contains(Entities.Block)
            ||blockNextTile.classList.contains(Entities.BlockDone))){            
            
                if(blockNextTile.classList.contains(Tiles.Goal)){
                blockNextTile.classList.add(Entities.BlockDone);
                goals++;
            }
            else{
                blockNextTile.classList.add(Entities.Block);
            }
            nextTile.classList.remove(Entities.Block);
            nextTile.classList.add(Entities.Character);
            currentTile.classList.remove(Entities.Character);
            PlayerPosition.X+=x;
            PlayerPosition.Y+=y;
        }
    }
    else if(nextTile.classList.contains(Entities.BlockDone)){
        if(!(blockNextTile.classList.contains(Entities.Block)||blockNextTile.classList.contains(Entities.BlockDone)
            ||blockNextTile.classList.contains(Tiles.Wall))){

            if(blockNextTile.classList.contains(Tiles.Goal)){
                blockNextTile.classList.add(Entities.BlockDone);                
            }
            else {  
                blockNextTile.classList.add(Entities.Block);
                goals--;
            }
            nextTile.classList.remove(Entities.BlockDone);
            nextTile.classList.add(Entities.Character);
            currentTile.classList.remove(Entities.Character);
            PlayerPosition.X+=x;
            PlayerPosition.Y+=y;
        }
    
    }
    else if(nextTile.classList.contains(Tiles.Floor)|| nextTile.classList.contains(Tiles.Goal)){
        nextTile.classList.add(Entities.Character);
        currentTile.classList.remove(Entities.Character);
        PlayerPosition.X+=x;
        PlayerPosition.Y+=y;
    }
    document.getElementById("score").innerHTML=goals;
    
    if(goals==maxGoals){
        
        document.getElementById("mission").innerHTML="Mission Complete!";
      
          
           
           
       
       
    }
}


function readKey(key){
    key.preventDefault();
    switch (key.keyCode){
        //Key value left
        case 37:  
            move(-1, 0);
            break;
            //Key value up
        case 38:  
            move(0 , -1);
            break;
            //Key value right
        case 39:  
            move(1, 0);
            break;
            //Key value  down
        case 40:  
            move(0, 1);
            break;
    }

}

function init(){
    window.addEventListener("keydown",readKey);
    drawBoard();
    
    document.getElementById("mission").innerHTML=" ";
}

function drawBoard(){
    goals=0;
    maxGoals = 0;
    document.getElementById("score").innerHTML=goals;
    let gameboardId = document.getElementById("gameboard");
    gameboardId.innerHTML="";
    console.log(Tiles.Wall);
    console.log(Entities.Character);
    console.log(Entities.Block);
    console.log(Tiles.Goal);
    
    for(let col = 0 ; col < tileMap01.height ; col++){
        for(let row = 0 ; row < tileMap01.width ; row++){
            let node = document.createElement("div");
            node.classList.add("tile-all");
            node.id = "" + row + ',' + col;
            element = tileMap01.mapGrid[col][row].toString();
            
            switch(element){
                case 'W':
                    node.classList.add(Tiles.Wall);
                    
                    break;
                case ' ':
                    node.classList.add(Tiles.Floor);
                    
                    break;
                case 'B':
                    node.classList.add(Entities.Block);
                    node.classList.add(Tiles.Floor);
                    break;
                case 'P':
                    node.classList.add(Entities.Character);
                    node.classList.add(Tiles.Floor);
                    PlayerPosition.X = row;
                    PlayerPosition.Y = col;
                    break;
                case 'G':
                    node.classList.add(Tiles.Goal);
                    maxGoals++;
                    
                    break;
                
                default :
                 
                    break;                 
            }
            gameboardId.appendChild(node);
        }
    }
}