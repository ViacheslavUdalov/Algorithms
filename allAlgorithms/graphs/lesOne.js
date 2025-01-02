// v - рёбра, e - количество вершин
function lesOne(v, e) {
    let index = 0;
    let map = new Map();
    let arrays = new Array(e).fill(0).map(() => new Array(e).fill(0));

    for (let i of v) {
        let [v1, v2] = i.split('');

        if (!map.has(v1)) map.set(v1, index++);
        if (!map.has(v2)) map.set(v2, index++);

            let v1_i = map.get(v1);
            let v2_i = map.get(v2);

            arrays[v1_i][v2_i] = 1;
            // arrays[v2_i][v1_i] = 1; // для неориентированного графа
        }
    return arrays;
    }



console.log(lesOne(['ab', 'bc', 'bd'], 3));