
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static final int NO_CYCLE_EXISTS = -1;

    public int longestCycle(int[] edges) {
        int[] indegree = new int[edges.length];
        initializeIndegree(edges, indegree);
        reduceIndegreeForEdgesNotPartOfCycle(edges, indegree);
        return findLongestCycle(edges, indegree);
    }

    private int findLongestCycle(int[] edges, int[] indegree) {
        boolean[] visited = new boolean[edges.length];
        int longestCycle = 0;
        for (int node = 0; node < edges.length; ++node) {
            if (indegree[node] > 0 && !visited[node]) {
                int lengthCycle = countCycleLength(edges, visited, node);
                if (lengthCycle > 0) {
                    longestCycle = Math.max(longestCycle, lengthCycle);
                }
            }
        }
        return longestCycle > 0 ? longestCycle : NO_CYCLE_EXISTS;
    }

    private void reduceIndegreeForEdgesNotPartOfCycle(int[] edges, int[] indegree) {
        Queue<Integer> queue = new LinkedList<>();
        for (int node = 0; node < edges.length; ++node) {
            if (indegree[node] == 0) {
                queue.add(node);
            }
        }

        while (!queue.isEmpty()) {
            int current = queue.poll();
            if (edges[current] >= 0) {
                if (--indegree[edges[current]] == 0) {
                    queue.add(edges[current]);
                }
            }
        }
    }

    private void initializeIndegree(int[] edges, int[] indegree) {
        for (int node = 0; node < edges.length; ++node) {
            if (edges[node] >= 0) {
                ++indegree[edges[node]];
            }
        }
    }

    private int countCycleLength(int[] edges, boolean[] visited, int node) {
        int cycleLength = 0;
        while (edges[node] >= 0 && !visited[node]) {
            ++cycleLength;
            visited[node] = true;
            node = edges[node];
        }
        return cycleLength;
    }
}
