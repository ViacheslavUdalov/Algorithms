let chars = 'abcdefgh';
let numbers = '12345678';
let graph = new Map();

function findQueen(startVertex, endVertex) {

    for (let char of chars) {
        for (let num of numbers) {
            let cell = char + num;
            graph.set(cell, new Set());
        }
    }

    fillGraph();
    // родитель - ключ значение, так же дистанция
    let parents = new Map();
    let distance = new Map();
    distance.set(startVertex, 0);
    let queue = [startVertex];
    while (queue.length > 0) {
        let ver = queue.shift();
        // console.log(graph)
        let neighbors = graph.get(ver);

        if (!neighbors) continue;

        for (let neighbor of neighbors) {
            if (!distance.has(neighbor)) {
                distance.set(neighbor, distance.get(ver) + 1);
                parents.set(neighbor, ver);
                queue.push(neighbor);
            }
        }
    }
    let path = [endVertex];
    let parent = parents.get(endVertex);
    while (parent) {
        path.push(parent);
        parent = parents.get(parent);
    }
    return path.reverse();
}

function fillGraph() {
    const moves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    for (let i = 0; i < chars.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            const v1 = chars[i] + numbers[j];
            let neighbors = [];
            for (const [x, y] of moves) {
                const dx = i + x;
                const dy = j + y;

                if (dx < 8 && dx >= 0 && dy < 8 && dy >= 0) {
                    const v2 = chars[dx] + numbers[dy];
                    neighbors.push(v2);
                }
            }

            graph.set(v1, neighbors);
        }
    }
    return graph;
}

console.log(findQueen('d4', 'f7'))
