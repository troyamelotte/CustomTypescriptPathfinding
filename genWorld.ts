import readline = require("readline");
export class WorldNode{

  public val: number;
  public isWall: boolean;
  public up: WorldNode | null = null;
  public down: WorldNode | null = null;
  public left: WorldNode | null = null;
  public right: WorldNode | null = null;

  constructor(num:number){
    this.val = num;
  }
}


export function genWorld(){
    return new Promise<WorldNode[][]>((resolve, reject)=>{
        queryUser("How many rows would you like?").then((response)=>{
            let totalRows = parseInt(response);

            queryUser("How many columns would you like?").then((colRes)=>{
                let totalColumns = parseInt(colRes);
                let rowArr: WorldNode[][] = [];
                for(let i = 0; i<totalRows; i++){

                    let row: WorldNode[] = [];
                    rowArr.push(row);

                    for(let k = 0; k<totalColumns; k++){     //1     //2
                        let newNode = new WorldNode((k+1)+(i*totalColumns));
                        if(rowArr[i-1]){
                            newNode.up = rowArr[i-1][k];
                            rowArr[i-1][k].down = newNode;
                        }

                        if(k>=1){
                            newNode.left = rowArr[i][k-1];
                            rowArr[i][k-1].right = newNode;
                        }
                        row.push(newNode);

                    }
                }
                console.log("Here's your world:");
                logWorld(rowArr);
                chooseWalls(rowArr).then(()=>{
                    resolve(rowArr);
                });

            })
        })
    })



}

function getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function logWorld(world:WorldNode[][]){
    for(let i = 0; i<world.length; i++){
        let loggedStr = "";
        for(let k = 0; k<world[i].length-1; k++){
            if(world[i][k].isWall){
                loggedStr += `|${world[i][k].val}|--`;
            }else{
                loggedStr += `{${world[i][k].val}}--`;
            }
        }
        if(world[i][world[i].length-1].isWall){
            loggedStr += `|${world[i][world[i].length-1].val}|`;
        }else{
            loggedStr += `{${world[i][world[i].length-1].val}}`;
        }
        console.log(loggedStr);
    }
}

export function queryUser(question:string){
    return new Promise<string>((resolve, reject)=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question+"\n", (answer) => {
            resolve(answer);
            rl.close();
        });
    })
}

function chooseWalls(world:WorldNode[][]){
    return new Promise<any>((resolve, reject)=>{
        function ask(){
            queryUser("Where would you like to place a wall? (number or 'done' for no more walls)").then((answer)=>{
                if(answer=='done'){
                    resolve();
                }else{
                    placeWalls(parseInt(answer), world);
                    ask();
                }
            })
        }
        ask();
    })
}

function placeWalls(place:number, world: WorldNode[][]){
    for(let i = 0; i < world.length; i++){

        for(let j = 0; j<world[i].length; j++){
            if(world[i][j].val == place){
                world[i][j].isWall = true;
                logWorld(world);
                return;
            }
        }

    }
}