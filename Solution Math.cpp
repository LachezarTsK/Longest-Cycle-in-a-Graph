
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    
    static const int NO_CYCLE_EXISTS = -1;
    
public:
    int longestCycle(const vector<int>& edges) const {
        int longestCycle = 0;
        int totalVisited = 0;
        vector<int> snapshotTotalVisited(edges.size());

        for (int node = 0; node < edges.size(); ++node) {
            int totalVisitedAtStartOfCurrentSearch = totalVisited;
            int current = node;

            while (edges[current] >= 0 && snapshotTotalVisited[current] == 0) {
                snapshotTotalVisited[current] = ++totalVisited;
                current = edges[current];
            }
            if (edges[current] >= 0 && snapshotTotalVisited[current] > totalVisitedAtStartOfCurrentSearch) {
                longestCycle = max(longestCycle, totalVisited - snapshotTotalVisited[current] + 1);
            }
        }
        return longestCycle > 0 ? longestCycle : NO_CYCLE_EXISTS;
    }
};
