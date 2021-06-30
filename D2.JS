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

const q = new PriorityQueue();

console.log("===== Enqueue ======");
console.log(q.enqueue("E", 3));
console.log(q.enqueue("B", 6));
console.log(q.enqueue("D", 9));
console.log(q.enqueue("C", 12));
console.log(q.enqueue("P", 16));
console.log(q.enqueue("F", 19));

console.log("===== Values ======");
console.log(q.values);

console.log("===== Dequeue ======");
console.log(q.dequeue());
