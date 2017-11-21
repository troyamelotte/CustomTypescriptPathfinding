"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
class WorldNode {
    constructor(num) {
        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;
        this.val = num;
    }
}
exports.WorldNode = WorldNode;
function genWorld() {
    return new Promise((resolve, reject) => {
        queryUser("How many rows would you like?").then((response) => {
            let totalRows = parseInt(response);
            queryUser("How many columns would you like?").then((colRes) => {
                let totalColumns = parseInt(colRes);
                let rowArr = [];
                for (let i = 0; i < totalRows; i++) {
                    let row = [];
                    rowArr.push(row);
                    for (let k = 0; k < totalColumns; k++) {
                        let newNode = new WorldNode((k + 1) + (i * totalColumns));
                        if (rowArr[i - 1]) {
                            newNode.up = rowArr[i - 1][k];
                            rowArr[i - 1][k].down = newNode;
                        }
                        if (k >= 1) {
                            newNode.left = rowArr[i][k - 1];
                            rowArr[i][k - 1].right = newNode;
                        }
                        row.push(newNode);
                    }
                }
                console.log("Here's your world:");
                logWorld(rowArr);
                chooseWalls(rowArr).then(() => {
                    resolve(rowArr);
                });
            });
        });
    });
}
exports.genWorld = genWorld;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function logWorld(world) {
    for (let i = 0; i < world.length; i++) {
        let loggedStr = "";
        for (let k = 0; k < world[i].length - 1; k++) {
            if (world[i][k].isWall) {
                loggedStr += `|${world[i][k].val}|--`;
            }
            else {
                loggedStr += `{${world[i][k].val}}--`;
            }
        }
        if (world[i][world[i].length - 1].isWall) {
            loggedStr += `|${world[i][world[i].length - 1].val}|`;
        }
        else {
            loggedStr += `{${world[i][world[i].length - 1].val}}`;
        }
        console.log(loggedStr);
    }
}
function queryUser(question) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question + "\n", (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}
exports.queryUser = queryUser;
function chooseWalls(world) {
    return new Promise((resolve, reject) => {
        function ask() {
            queryUser("Where would you like to place a wall? (number or 'done' for no more walls)").then((answer) => {
                if (answer == 'done') {
                    resolve();
                }
                else {
                    placeWalls(parseInt(answer), world);
                    ask();
                }
            });
        }
        ask();
    });
}
function placeWalls(place, world) {
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world[i].length; j++) {
            if (world[i][j].val == place) {
                world[i][j].isWall = true;
                logWorld(world);
                return;
            }
        }
    }
}
