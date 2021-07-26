import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { txAttrs } from "../types/types";
import { emitTrashedTransaction } from "./TrashedEvents";

/*
    gets the same job done as doubly linked list based data structure but has differnt time complexity for differnt actions 
*/


export class TxHeap {
    private queue : MinPriorityQueue<txAttrs>;
    public capacity : number = 5000; 
    constructor(capacity : number = 5000){
        this.queue = new MinPriorityQueue<txAttrs>();
        this.capacity = capacity; 
    };
    
    insertTransaction(tx : txAttrs,  cb : (t : txAttrs) => number) : void {
        if (this.queue.size() + 1 <= this.capacity){
            this.queue.enqueue(tx, cb(tx));
        } else {
            const omittedTx = this.queue.dequeue().element;
            emitTrashedTransaction(omittedTx);
            this.queue.enqueue(tx, cb(tx));
        };
    };

    toArrayFromHighestPriority(){
        return this.queue.toArray().reverse().map(i => i.element);
    };
  
    toArrayFromLowestPriority(){
        return this.queue.toArray().map(i => i.element);
    }; 
};