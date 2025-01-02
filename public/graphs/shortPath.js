export function shortPath(start, graph, end) {
    // объект родителей каждой вершины, по итогу будет содержать одного родителя каждой вершины, кроме стартовой точки
    let parents = {};
    // сэт для проверки, была ли уже вершина задейтсована, если была, но идём дальше
    let distance = new Set();
    // сразу добавляем стартовую точку
    distance.add(start);
    let queue = [start];
    while (queue.length > 0) {
        let vertex = queue.shift();
        for (let v of graph[vertex]) {
            if (!distance.has(v)) {
                distance.add(v);
                parents[v] = vertex;
                queue.push(v);
            }
        }
    }
    let path = [end];
    let parent = parents[end];
    while (parent) {
        path.push(parent);
        parent = parents[parent];
    }
    console.log('distance');
    console.log(distance);
    console.log('parents');
    console.log(parents);
    return path.reverse();
}
let graph = {
    A: ['B', 'D'],
    B: ['A', 'C', 'E'],
    C: ['B'],
    D: ['A', 'E'],
    E: ['B', 'D', 'F'],
    F: ['E'],
};
console.log(shortPath("A", graph, "C"));
