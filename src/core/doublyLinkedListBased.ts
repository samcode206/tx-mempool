import { txAttrs } from "../types/types";
import { emitTrashedTransaction } from "./TrashedEvents";

// holds the transaction value and the pointers to the next and previous transactions in the chain 
class Tx <T> {
    public value : T;
    public prev : this | null;
    public next : this | null; 
    
    constructor(val : T){
        this.value = val; 
        this.prev = null;
        this.next = null; 
    };
};

type tx = Tx<txAttrs>;

export class TxsChain {
    public head : tx | null;
    public tail : tx | null;
    public size : number; 
    public capacity : number = 5000; 
    
    constructor(capacity : number = 5000){
        this.head = null;
        this.tail = null; 
        this.size = 0; 
        this.capacity = capacity; 
    };
  // inserts a new transaction before a given node 
  private insertBefore(node : tx, newNode : tx){
      if (newNode === this.head && newNode === this.tail) return; 

      this.remove(newNode); 
      newNode.prev = node.prev; 
      newNode.next = node; 

      if (node.prev === null){
      this.head = newNode; 
      }else {
      node.prev.next = newNode; 
      };

      node.prev = newNode; 
      this.size ++; 
  }; 

  // inserts a new transaction after a given node 
  private insertAfter(node : tx, newNode : tx){
      if (newNode === this.head && newNode === this.tail) return; 

      this.remove(newNode);
      newNode.prev = node; 
      newNode.next = node.next; 

      if (node.next === null){
        this.tail = newNode;
      }else {
        node.next.prev = newNode; 
      };

      node.next = newNode; 
      this.size ++; 
  }; 
    // removes a transaction node from the linked list and calls removeNodeBIndings to remove pointers 
    private remove(node : tx) {
        if (node === this.head){
          this.head = this.head.next; 
        };
        if (node === this.tail){
          this.tail = this.tail.prev; 
        };
        this.removeNodeBindings(node); 
    }

    // unchains a removed transaction from the linked list 
    private removeNodeBindings(node : tx){
        if (node.prev !== null){
            node.prev.next = node.next; 
          };
          if (node.next !== null){
            node.next.prev = node.prev; 
          }
          node.prev = null; 
          node.next = null;
        }

        // sets a new highest priortiy transaction 
        private setHead(node : tx){
          if (this.head === null){
              this.head = node;
              this.tail = node; 
              this.size ++; 
          } else {
              this.insertBefore(this.head, node);
          };
      };
      // sets a new low priority transactions 
      private setTail(node : tx){
          if (this.tail === null){
              this.setHead(node);
          } else {
              this.insertAfter(this.tail, node);
          };
      };
      // remove a low priority transaction to allow space for a new transaction to be inserted 
      private removeTail() : txAttrs | null {
        if (this.tail !== null){
          const tail = this.tail.value; 
          this.remove(this.tail);
          this.size --; 
          return tail; 
        }
        return null; 
      }; 

      // finds the location of the node to insert by itterating through the transaction chain runs in O(n)
      private findInsertionNode(cb : (t : txAttrs) => number, val : number){
        let curr = this.head; 
        while(curr !== null){
           if (cb(curr.value) >= val){
            curr = curr.next;   
          } else {
            return curr;   
          };
        };
        return null;
      }; 

      /*
      the method used to insert the new transaction and ensures that it still remains within capacity and sorted in highest priority O(n)
      delegates the itteration work to the method above it
      */
      insertTransaction(tx : txAttrs, cb : (t : txAttrs) => number) : void {
        // iterate through the linked list to find right insertion spot 
        const newTx = new Tx<txAttrs>(tx); 

        if (this.head === null || this.tail === null){
          this.setHead(newTx);
          return;
        };  

        if (this.size + 1 <= this.capacity){
          const node = this.findInsertionNode(cb, cb(newTx.value)); 
          if (node !== null){
            this.insertBefore(node, newTx)
          } else {
            this.setTail(newTx);
          }
        } 
        else {
          const tail = this.removeTail();
          if (tail !== null) emitTrashedTransaction(tail);
          const node = this.findInsertionNode(cb, cb(newTx.value)); 
          if (node !== null){
            this.insertBefore(node,newTx);
          } else {
            this.setTail(newTx); 
          }
        };
      };

      toArrayFromHighestPriority(){
        const arr = []; 
        let curr = this.head; 
        while (curr !== null){
          arr.push(curr.value);
          curr = curr.next; 
        };
        return arr; 
      };
  
      toArrayFromLowestPriority(){
        const arr = []; 
        let curr = this.tail; 
        while (curr !== null){
          arr.push(curr.value);
          curr = curr.prev; 
        };
        return arr; 
      }; 
    }; 