// взвешенные графы

const graph = {
    A: {B: 4, C: 2},
    B: {A: 4, C: 1, D: 5},
    C: {A: 2, B: 1, D: 8, E: 10},
    D: {B: 5, C: 8, E: 2, Z: 6},
    E: {C: 10, D: 2, Z: 3},
    Z: {D: 6, E: 3}
};

function dijkstra(graph, startPoint) {
    let distance = new Map();
    distance.set(startPoint, 0);
    let queue = [startPoint];

    while (queue.length > 0) {
        let ver = queue.shift();
        console.log(graph[ver])
        for (let neighbor of Object.keys(graph[ver])) {
            if (!distance.has(neighbor)
                || distance.get(ver) + graph[ver][neighbor] < distance
                    .get(neighbor)) {
                distance.set(neighbor, distance.get(ver) + graph[ver][neighbor]);
                queue.push(neighbor);
            }
        }
    }
    return distance;
}

console.log(dijkstra(graph, "A"))