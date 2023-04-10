
/**
 * @param {number[]} edges
 * @return {number}
 */
var longestCycle = function (edges) {
    const NO_CYCLE_EXISTS = -1;
    const snapshotTotalVisited = new Array(edges.length).fill(0);
    let longestCycle = 0;
    let totalVisited = 0;

    for (let node = 0; node < edges.length; ++node) {
        let totalVisitedAtStartOfCurrentSearch = totalVisited;
        let current = node;

        while (edges[current] >= 0 && snapshotTotalVisited[current] === 0) {
            snapshotTotalVisited[current] = ++totalVisited;
            current = edges[current];
        }
        if (edges[current] >= 0 && snapshotTotalVisited[current] > totalVisitedAtStartOfCurrentSearch) {
            longestCycle = Math.max(longestCycle, totalVisited - snapshotTotalVisited[current] + 1);
        }
    }
    return longestCycle > 0 ? longestCycle : NO_CYCLE_EXISTS;
};
