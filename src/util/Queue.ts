/**
 * Returns the left node given an index
 * @param { Number } index The index of the parent
 * @returns { Number } The index of the left node
 */
export function getLeft(index: number): number {
    return 2 * index + 1;
}

/**
 * Returns the right node given an index
 * @param { Number } index The right of the parent
 * @returns { Number } The right of the left node
 */
export function getRight(index: number): number {
    return 2 * index + 2;
}

/**
 * Returns the parent node given an index
 * @param { Number } index The index of the child
 * @returns { Number } The index of the parent
 */
export function getParent(index: number): number {
    return ((index - 1) / 2) << 0;
}

/**
 * A prioritizable object
 * @abstract
 */
export interface Prioritizable {
    /**
     * Returns the priority of the Prioritizable object
     * @returns { number } The priority
     */
    getPriority(): number;
    [stuff: string]: unknown;
}

/**
 * A priority queue implementation using a binary max heap.
 */
export class PriorityQueue {
    private nodes: Prioritizable[]; //represents the tree compressed onto an array.

    /**
     * Creates a priority queue.
     * @param { Prioritizable[] } nodes The already max-heapified array that represents the binary heap
     */
    private constructor(nodes: Prioritizable[]) {
        this.nodes = nodes;
    }

    /**
     * Creates an empty queue
     * @returns { PriorityQueue } An empty queue
     */
    public static createEmpty() {
        return new PriorityQueue([]);
    }

    /**
     * Sorts the subtree according to max-heap rules.
     * @param { Prioritizable[] } nodes The list of nodes representing the full tree
     * @param { number } i The index of the head of the subtree
     * @param { number } len The length of the full tree
     */
    private static heapify(nodes: Prioritizable[], i: number, len: number) {
        while (true)
        {
            let max = i;
            let left = getLeft(i);
            let right = getRight(i);
            
            if (left < len && nodes[left].getPriority() > nodes[max].getPriority())
            {
                max = left;
            }
            
            if (right < len && nodes[right].getPriority() > nodes[max].getPriority())
            {
                max = right;
            }
    
            if (max != i)
            {
                let swap = nodes[i]
                nodes[i] = nodes[max];
                nodes[max] = swap;
                
                i = max;
            }
            else
            {
                break;
            }
        }
    }

    /**
     * Creates a Queue from an array
     * @param { Prioritizable[] } nodes The array to create the Queue from
     * @returns { PriorityQueue } The created Queue
     */
    public static createFromArray(nodes: Prioritizable[]) {
        let len = nodes.length;

        for (let i = getParent(len - 1); i >= 0; --i)
        {
            PriorityQueue.heapify(nodes, i, len);
        }

        return new PriorityQueue(nodes);
    }

    /**
     * Inserts a node into the heap
     * @param { Prioritizable } node The node to be inserted
     */
    public insert(node: Prioritizable)
    {
        let nodes = this.nodes;

        if (nodes.length === 0)
            nodes[0] = node;
        else {
            let priority = node.getPriority();
            let index = nodes.push(node) - 1;

            while (index > 0) {
                let parentIndex = getParent(index);
                let parent = nodes[parentIndex];

                if (priority > parent.getPriority()) {
                    //swap
                    nodes[index] = parent;
                    nodes[parentIndex] = node;

                    index = parentIndex;

                }
                else {
                    break;
                }
            }
        }
    }

    /**
     * Returns the highest priority member of the Queue
     * @returns { Prioritizable | void } Returns the highest priority member, or nothing if the Queue is empty.
     */
    public pop(): Prioritizable | void
    {
        let nodes = this.nodes;
        let head = nodes[0];

        nodes[0] = nodes.pop();
        
        PriorityQueue.heapify(nodes, 0, nodes.length);

        return head;
    }

    /**
     * Removes an element form the PriorityQueue
     * @param { Prioritizable } node The node to remove.
     */
    public remove(node: Prioritizable)
    {
        let nodes = this.nodes;
        let indexToRemove = nodes.indexOf(node);
        let last = nodes.length - 1;

        if (indexToRemove == last)
        {
            nodes.pop();
        }
        else
        {
            nodes[indexToRemove] = nodes.pop();

            PriorityQueue.heapify(nodes, indexToRemove, last);
        }
    }
}