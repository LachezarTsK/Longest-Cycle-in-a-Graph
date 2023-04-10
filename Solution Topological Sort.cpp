
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    
    static const int NO_CYCLE_EXISTS = -1;
    
public:
    int longestCycle(const vector<int>& edges) const {
        vector<int> indegree(edges.size());
        initializeIndegree(edges, indegree);
        reduceIndegreeForEdgesNotPartOfCycle(edges, indegree);
        return findLongestCycle(edges, indegree);
    }

private:
    int findLongestCycle(const vector<int>& edges, const vector<int>& indegree) const {
        vector<bool> visited(edges.size());
        int longestCycle = 0;
        for (int node = 0; node < edges.size(); ++node) {
            if (indegree[node] > 0 && !visited[node]) {
                int lengthCycle = countCycleLength(edges, visited, node);
                if (lengthCycle > 0) {
                    longestCycle = max(longestCycle, lengthCycle);
                }
            }
        }
        return longestCycle > 0 ? longestCycle : NO_CYCLE_EXISTS;
    }

    void reduceIndegreeForEdgesNotPartOfCycle(const vector<int>& edges, vector<int>& indegree) const {
        queue<int> queue;
        for (int node = 0; node < edges.size(); ++node) {
            if (indegree[node] == 0) {
                queue.push(node);
            }
        }

        while (!queue.empty()) {
            int current = queue.front();
            queue.pop();
            if (edges[current] >= 0) {
                if (--indegree[edges[current]] == 0) {
                    queue.push(edges[current]);
                }
            }
        }
    }

    void initializeIndegree(const vector<int>& edges, vector<int>& indegree) const {
        for (int node = 0; node < edges.size(); ++node) {
            if (edges[node] >= 0) {
                ++indegree[edges[node]];
            }
        }
    }

    int countCycleLength(const vector<int>& edges, vector<bool>& visited, int node) const {
        int cycleLength = 0;
        while (edges[node] >= 0 && !visited[node]) {
            ++cycleLength;
            visited[node] = true;
            node = edges[node];
        }
        return cycleLength;
    }
};
