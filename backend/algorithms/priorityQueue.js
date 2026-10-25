class PriorityQueue {

    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    enqueue(value, priority) {
        const item = {
            value: value,
            priority: priority
        };

        this.heap.push(item);
        this.bubbleUp();
    }

    dequeue() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const minimum = this.heap[0];

        this.heap[0] = this.heap.pop();

        this.bubbleDown();

        return minimum;
    }

    bubbleUp() {

        let index = this.heap.length - 1;

        while (index > 0) {

            const parentIndex = Math.floor((index - 1) / 2);

            if (
                this.heap[parentIndex].priority <=
                this.heap[index].priority
            ) {
                break;
            }

            const temp = this.heap[parentIndex];

            this.heap[parentIndex] = this.heap[index];

            this.heap[index] = temp;

            index = parentIndex;
        }
    }

    bubbleDown() {

        let index = 0;

        while (true) {

            const left = 2 * index + 1;
            const right = 2 * index + 2;

            let smallest = index;

            if (
                left < this.heap.length &&
                this.heap[left].priority <
                this.heap[smallest].priority
            ) {
                smallest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right].priority <
                this.heap[smallest].priority
            ) {
                smallest = right;
            }

            if (smallest === index) {
                break;
            }

            const temp = this.heap[index];

            this.heap[index] = this.heap[smallest];

            this.heap[smallest] = temp;

            index = smallest;
        }
    }
}

module.exports = PriorityQueue;