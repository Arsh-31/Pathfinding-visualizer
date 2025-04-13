export class MinHeap {
  private heap: { row: number; column: number; distance: number }[];

  constructor() {
    this.heap = [];
  }

  insert(node: { row: number; column: number; distance: number }) {
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);

    return min;
  }

  private heapifyUp(index: number) {
    if (index === 0) return;

    const parentIndex = Math.floor((index - 1) / 2);

    // if the distance of parent is greater than the distance of child
    if (this.heap[parentIndex].distance > this.heap[index].distance) {
      // swap them
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[index];
      this.heap[index] = temp;

      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number) {
    let smallest = index;
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].distance < this.heap[smallest].distance
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].distance < this.heap[smallest].distance
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      const temp = this.heap[smallest];
      this.heap[smallest] = this.heap[index];
      this.heap[index] = temp;

      this.heapifyDown(smallest);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  printHeap() {
    console.log(this.heap);
  }
}
