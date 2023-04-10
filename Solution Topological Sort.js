
/**
 * @param {number[]} edges
 * @return {number}
 */
var longestCycle = function (edges) {
    this.NO_CYCLE_EXISTS = -1;
    const indegree = new Array(edges.length).fill(0);
    initializeIndegree(edges, indegree);
    reduceIndegreeForEdgesNotPartOfCycle(edges, indegree);s
    return findLongestCycle(edges, indegree);
};

/**
 * @param {number[]} edges
 * @param {number[]} indegree
 * @return {number}
 */
function findLongestCycle(edges, indegree) {
    const visited = new Array(edges.length).fill(false);
    let longestCycle = 0;
    for (let node = 0; node < edges.length; ++node) {
        if (indegree[node] > 0 && !visited[node]) {
            let lengthCycle = countCycleLength(edges, visited, node);
            if (lengthCycle > 0) {
                longestCycle = Math.max(longestCycle, lengthCycle);
            }
        }
    }
    return longestCycle > 0 ? longestCycle : this.NO_CYCLE_EXISTS;
}

/**
 * @param {number[]} edges
 * @param {number[]} indegree
 * @return {void}
 */
function reduceIndegreeForEdgesNotPartOfCycle(edges, indegree) {
    //const {Queue} = require('@datastructures-js/queue');
    const queue = new Queue();//Queue<Number>
    for (let node = 0; node < edges.length; ++node) {
        if (indegree[node] === 0) {
            queue.enqueue(node);
        }
    }

    while (!queue.isEmpty()) {
        let current = queue.dequeue();
        if (edges[current] >= 0) {
            if (--indegree[edges[current]] === 0) {
                queue.enqueue(edges[current]);
            }
        }
    }
}

/**
 * @param {number[]} edges
 * @param {number[]} indegree
 * @return {void}
 */
function  initializeIndegree(edges, indegree) {
    for (let node = 0; node < edges.length; ++node) {
        if (edges[node] >= 0) {
            ++indegree[edges[node]];
        }
    }
}

/**
 * @param {number[]} edges
 * @param {boolean[]} visited
 * @param {number} node
 * @return {number}
 */
function countCycleLength(edges, visited, node) {
    let cycleLength = 0;
    while (edges[node] >= 0 && !visited[node]) {
        ++cycleLength;
        visited[node] = true;
        node = edges[node];
    }
    return cycleLength;
}
