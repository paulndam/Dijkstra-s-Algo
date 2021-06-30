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
    while (nodes.value.length) {
      smallest = nodes.dequeue().value;
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
    console.log("=== Path =====", path);
    return path.concat(smallest).reverse();
  }
}

class PriorityQueue {
  constructor() {
    this.value = [];
  }

  enqueue(value, priority) {
    let newNode = new Node(value, priority);
    this.value.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let lastIndex = this.value.length - 1;
    const element = this.value[lastIndex];
    while (lastIndex > 0) {
      let parentIndex = Math.floor((lastIndex - 1) / 2);
      let parent = this.value[parentIndex];

      if (element.priority >= parent.priority) {
        break;
      }
      this.value[parentIndex] = element;
      this.value[lastIndex] = parent;
      lastIndex = parentIndex;
    }
  }

  dequeue() {
    // get first element
    const min = this.value[0];
    const end = this.value.pop();
    if (this.value.length > 0) {
      this.value[0] = end;

      // sink down
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let index = 0;
    const length = this.value.length;
    const element = this.value[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;

      // value to store varaibles at the left and right indexes
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.value[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.value[rightChildIndex];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.value[index] = this.value[swap];
      this.value[swap] = element;
      index = swap;
    }
  }
}

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
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
