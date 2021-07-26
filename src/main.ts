import parseRawTxs from "./utils/parser";
import {configAttrs, structs, txAttrs, writeLocations} from "./types/types";
import { TxHeap } from "./core/HeapBased";
import { transactionEvents, txEvents } from "./core/TrashedEvents";
import { TxsChain } from "./core/doublyLinkedListBased";
import { writeTxs } from "./utils/writer";


const rejectedTransactions : Array<txAttrs> = []; 

/*
    when a transaction gets removed from the mempool an event will be emitted 
    this is because we don't want to throw away the transaction without doing something 
    with it such as possibly broadcasting it to other nodes in the network to pick it up 
    for siplicity we can simply add it to an array to store it and possibly also write it to a 
    seperate file
*/ 

transactionEvents.on( txEvents.trashed, (tx)=>{
    rejectedTransactions.push(tx);
});

// sorting the priority of transactions by gas * fee per gas 
const txSortingBy = (tx: txAttrs) : number => (tx.Gas * tx.FeePerGas); 


// read and parsed the transactions file 
const unsortedTransactions : Array<txAttrs> = parseRawTxs();


// starter function 
export function main(options : configAttrs) : void {

    let mempool : TxHeap | TxsChain;

    switch (options.dataStruct){
        case structs.heap: 
            mempool = new TxHeap(options.maximumPoolSize);
            break;
        default:
            mempool = new TxsChain(options.maximumPoolSize);    
            break; 
    }; 
    
    unsortedTransactions.forEach(transaction =>{
        mempool.insertTransaction(transaction, txSortingBy);
    });
    writeTxs(mempool.toArrayFromHighestPriority(), writeLocations.prioritized);
    if (options.saveRejectedTransactions) writeTxs(rejectedTransactions, writeLocations.rejected);
}
