const Heap = require('heap');

const minHeap = new Heap((a, b) => b - a);
// Insert elements into the heap
minHeap.push(5);
minHeap.push(3);
minHeap.push(8);
minHeap.push(1);
minHeap.push(10);

console.log(minHeap);

const minHeapArray = minHeap.toArray();
console.log(minHeapArray); // Output: [1, 3, 8, 5, 10]