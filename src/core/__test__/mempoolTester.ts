import { txAttrs } from "../../types/types";
import { TxsChain } from "../doublyLinkedListBased";
import { TxHeap } from "../HeapBased";


const sorterCb = (tx: txAttrs) => tx.Gas * tx.FeePerGas; 

export class MempoolTester {

    static testPriorityOrder(txs : Array<txAttrs>, ds : TxHeap | TxsChain) : boolean {
        for (const t of txs){
            ds.insertTransaction(t,sorterCb)
        };
        
        return this.isAlwaysDecreasingPriority(ds.toArrayFromHighestPriority(), sorterCb) && 
               this.isAlwaysIncreasingPriority(ds.toArrayFromLowestPriority(), sorterCb);
    }; 

    // makes sure transactions are in correct order when turned to array before writing to file
    private static isAlwaysDecreasingPriority (txs : Array<txAttrs>, cb : (tx: txAttrs) => number) : boolean {
            for (let i = 1; i < txs.length; i++){
            const currTxVal = cb(txs[i]); 
            const lastTxVal = cb(txs[i - 1]);
            if (currTxVal >= lastTxVal){
                throw new Error("not in correct decreasing order");  
            }
        };
        return true; 
    };
    // makes sure transactions are in correct order when turned to array before writing to file 
    private static isAlwaysIncreasingPriority (txs : Array<txAttrs>, cb : (tx: txAttrs) => number) : boolean {
        for (let i = 1; i < txs.length; i++){
            const currTxVal = cb(txs[i]); 
            const lastTxVal = cb(txs[i - 1]);
            if (currTxVal <= lastTxVal){
                throw new Error("not in correct increasing order");
            }
        };
        return true;  
    };

    static testCapacityLimit(ds : TxHeap | TxsChain, capacity : number, txs : Array<txAttrs>, expectedArrayOutput : Array<txAttrs>){
        for (const t of txs){
            ds.insertTransaction(t,sorterCb)
        };

        const res = ds.toArrayFromHighestPriority();

        if (ds.capacity !== capacity && res.length !== capacity) throw new Error("capacity excedded"); 
        for (let i = 0; i < expectedArrayOutput.length; i++){
            if (sorterCb(expectedArrayOutput[i]) !== sorterCb(res[i])){
                throw new Error("results not matching"); 
            }
        }

        return true; 
    };

};

