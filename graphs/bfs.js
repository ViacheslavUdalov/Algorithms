// обход графа в ширину
// парамерты - количество вершин и количество рёбер
// Выделение компонент связности в графе за O(n+m)
// Поиск кратчайшего пути в невзвешенном графе
// Восстановление кратчайшего пути
// Нахождение кратчайшего цикла в ориентированном невзвешенном графе
// Найти все рёбра, лежащие на каком-либо кратчайшем пути между заданной парой вершин (a,b)
// Найти все вершины, лежащие на каком-либо кратчайшем пути между заданной парой вершин (a,b)
// Найти кратчайший чётный путь в графе (т.е. путь чётной длины)
function bfs(start, graph) {
    // в очередь добавляем вершины
    let queue = [start];
    let visited = new Set();
    let result = [];

    while (queue.length) {
        const vertex = queue.shift();
        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);

            for (let neighbor of graph[vertex]) {
                queue.push(neighbor);
            }
        }
    }
    return result;
}

let graph = {
    A: ['B', 'D'],
    B: ['A', 'C', 'E'],
    C: ['B'],
    D: ['A', 'E'],
    E: ['B', 'D', 'F'],
    F: ['E'],
}
console.log(bfs('C',graph))