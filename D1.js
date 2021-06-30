class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priorityVal) {
    this.values.push({ val, priorityVal });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priorityVal - b.priorityVal);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  Dijkstra(start, finish) {
    // make new priority queue
    const nodes = new PriorityQueue();
    const distance = {};
    const previous = {};
    //   to see and return path at the end.
    let path = [];
    let smallest;

    // make up inintail state.
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distance[vertex] = 0;
        // add vertex or nodes in the priority queue,so to know what to start with.
        nodes.enqueue(vertex, 0);
      } else {
        distance[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there's something to visit.
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      // build a path to return at the end.

      // if the starting vertex is same as the ending vertex
      if (smallest === finish) {
        // we are done.
        // make path to return.
        console.log("-----Distance------", distance);
        console.log("-----Previous------", previous);

        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      // if it is not the case
      if (smallest || distance[smallest] !== Infinity) {
        // loop thru each value in the adjacencyList for that vertex.
        for (let neighbor in this.adjacencyList[smallest]) {
          // find the next neighbor node.
          let nextNode = this.adjacencyList[smallest][neighbor];

          //   console.log(neighbor);
          //   console.log(this.adjacencyList);
          console.log(nextNode);
          //   calculate the new distance to neighbor node or next node.
          let candidate = distance[smallest] + nextNode.weight;
          //   checxk if the current vertex weight is smaller than the current vertex neighbor node weight
          let nextNeighbor = nextNode.node;
          if (candidate < distance[nextNeighbor]) {
            //   update new smallest distance to neighbor
            distance[nextNeighbor] = candidate;
            //   update previous.
            previous[nextNeighbor] = smallest;
            //   enqueue in priority queue with new priority.
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
    console.log("=== Path =====", path);
  }
}

const graph = new WeightedGraph();

console.log("===== Adding Vertex ======");
console.log(graph.addVertex("A"));
console.log(graph.addVertex("B"));
console.log(graph.addVertex("C"));
console.log(graph.addVertex("D"));
console.log(graph.addVertex("E"));
console.log(graph.addVertex("F"));

console.log("===== Adding Edge && Weight ======");
console.log(graph.addEdge("A", "B", 10));
console.log(graph.addEdge("A", "C", 12));
console.log(graph.addEdge("B", "E", 14));
console.log(graph.addEdge("C", "D", 10));
console.log(graph.addEdge("C", "F", 12));
console.log(graph.addEdge("D", "E", 11));
console.log(graph.addEdge("D", "F", 10));
console.log(graph.addEdge("E", "F", 10));

console.log("===== Adjacency list ======");

console.log(graph.adjacencyList);

console.log("====== Dijkstra ========");
console.log(graph.Dijkstra("A", "E"));
