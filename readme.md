## Custom Typescript Pathfinding Algorithm

I built this in around 5 hours o n a Monday Night. The goal was to test a pathfinding algorithm I had been thinking about for a while. This whole thing was done completely from scratch with no research into other pathfinding algorithms.

### How it works:

First it prompts the user to setup a grid. Asking for how many columns/rows it should have. Each of the nodes are given a unique value so that they can be tracked and identified.

![](https://gyazo.com/9ed6e876866055f4ee4ec064100fd12b.png)

The user then has the ability to place walls that the algorithm can't pass through. The user may pass as many as they want. It'll continue to add them until the user says 'done'. It'll update the visual graphic of the world accordingly (changes the brackets to ||).

![](https://gyazo.com/90f9378019fd948a4807defa339d7a87.png)

Finally the user has the ability to define the starting and ending point. After submitting the end point the algorithm will run and find the most optimal path (the path with the least steps) from the start to end. If it's not possible to finish the algorithm will output "false".

![](https://gyazo.com/030de1ace79a2e19c589a021944cc382.png)
![](https://gyazo.com/c1effb9e0caf8677e94346bef17d3358.png)

### How to run it:

If you want to play with the code yourself simply fork/clone it and `npm install` in the directory. If you don't have typescript you'll need to install that as well. Finally just compile it with `tsc` and run it with `node finder.js`