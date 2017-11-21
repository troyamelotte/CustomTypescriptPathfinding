"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genWorld_1 = require("./genWorld");
let world;
genWorld_1.genWorld().then((newWorld) => {
    world = newWorld;
    getOptimalPath();
});
function getOptimalPath() {
    let endValue = world[world.length - 1][world[world.length - 1].length - 1].val;
    function diveIn(currentState, currentNode) {
        //Make shallow copy
        let newState = currentState.slice();
        newState.push(currentNode.val);
        if (currentNode.isWall) {
            return false;
        }
        if (currentNode.val == endValue) {
            console.log("here");
            return newState;
        }
        // Had to use any here or my life would be not fun :(
        let rightNodePath = false;
        let downNodePath = false;
        let leftNodePath = false;
        let upNodePath = false;
        if (currentNode.right && !newState.includes(currentNode.right.val)) {
            rightNodePath = diveIn(newState, currentNode.right);
        }
        if (currentNode.down && !newState.includes(currentNode.down.val)) {
            downNodePath = diveIn(newState, currentNode.down);
        }
        if (currentNode.left && !newState.includes(currentNode.left.val)) {
            leftNodePath = diveIn(newState, currentNode.left);
        }
        if (currentNode.up && !newState.includes(currentNode.up.val)) {
            upNodePath = diveIn(newState, currentNode.up);
        }
        if (!rightNodePath && !downNodePath && !upNodePath && !leftNodePath) {
            return false;
        }
        console.log("yohoo");
        console.log(rightNodePath);
        console.log(downNodePath);
        console.log(leftNodePath);
        console.log(upNodePath);
        if (rightNodePath && downNodePath && upNodePath && leftNodePath) {
            return getHighest(rightNodePath, downNodePath, upNodePath, leftNodePath);
        }
        else if (leftNodePath && downNodePath && upNodePath) {
            return getHighest(leftNodePath, downNodePath, upNodePath);
        }
        else if (leftNodePath && rightNodePath && upNodePath) {
            return getHighest(leftNodePath, rightNodePath, upNodePath);
        }
        else if (leftNodePath && rightNodePath && downNodePath) {
            return getHighest(leftNodePath, rightNodePath, downNodePath);
        }
        else if (upNodePath && rightNodePath && downNodePath) {
            return getHighest(upNodePath, rightNodePath, downNodePath);
        }
        else if (rightNodePath && downNodePath) {
            return getHighest(rightNodePath, downNodePath);
        }
        else if (rightNodePath && leftNodePath) {
            return getHighest(rightNodePath, leftNodePath);
        }
        else if (rightNodePath && upNodePath) {
            return getHighest(rightNodePath, upNodePath);
        }
        else if (downNodePath && leftNodePath) {
            return getHighest(downNodePath, leftNodePath);
        }
        else if (downNodePath && upNodePath) {
            return getHighest(downNodePath, upNodePath);
        }
        else if (leftNodePath && upNodePath) {
            return getHighest(leftNodePath, upNodePath);
        }
        else if (rightNodePath) {
            return rightNodePath;
        }
        else if (leftNodePath) {
            return leftNodePath;
        }
        else if (upNodePath) {
            return upNodePath;
        }
        else {
            console.log("returning node down");
            return downNodePath;
        }
        // return false;
    }
    genWorld_1.queryUser("Where would you like to start?").then((answer) => {
        let x;
        let y;
        let target = parseInt(answer);
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world[i].length; j++) {
                if (target == world[i][j].val) {
                    console.log("The most optimal path is " + diveIn([], world[i][j]));
                }
            }
        }
    });
    return;
}
function getHighest(first, second, third, fourth) {
    let checkerList = [first, second];
    if (third) {
        checkerList.push(third);
    }
    if (fourth) {
        checkerList.push(fourth);
    }
    let max = checkerList[0];
    for (let i = 1; i < checkerList.length; i++) {
        if (checkerList[i].length < max.length) {
            max = checkerList[i];
        }
    }
    return max;
}
