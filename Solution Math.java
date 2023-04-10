
public class Solution {

    private static final int NO_CYCLE_EXISTS = -1;

    public int longestCycle(int[] edges) {
        int longestCycle = 0;
        int totalVisited = 0;
        int[] snapshotTotalVisited = new int[edges.length];

        for (int node = 0; node < edges.length; ++node) {
            int totalVisitedAtStartOfCurrentSearch = totalVisited;
            int current = node;

            while (edges[current] >= 0 && snapshotTotalVisited[current] == 0) {
                snapshotTotalVisited[current] = ++totalVisited;
                current = edges[current];
            }
            if (edges[current] >= 0 && snapshotTotalVisited[current] > totalVisitedAtStartOfCurrentSearch) {
                longestCycle = Math.max(longestCycle, totalVisited - snapshotTotalVisited[current] + 1);
            }
        }
        return longestCycle > 0 ? longestCycle : NO_CYCLE_EXISTS;
    }
}
