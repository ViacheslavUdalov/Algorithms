// обход графа в грубину
function dfs(startNode, graph, visited = new Set()) {
    visited.add(startNode);
    for (let neighbour of graph[startNode]) {
        if (!visited.has(neighbour)) {
            dfs(neighbour, graph, visited);
        }
    }
    return visited;
}

console.log(dfs( 'A',{
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': ['C'],
    'E': ['B', 'F'],
    'F': ['A'],
} ))