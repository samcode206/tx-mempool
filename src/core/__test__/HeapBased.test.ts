import { TxHeap } from "../HeapBased";
import { MempoolTester } from "./mempoolTester";
import { txValsOverflow, txVals, expectedOverflowResult } from "./transactionTestVals";

it("given unsorted transactions it should sort them and return them in order of highest priority and lowest priority", () => {
    const dll = new TxHeap(5); 
    expect(MempoolTester.testPriorityOrder(txVals, dll)).toEqual(true);
}); 


it("remove lowest priority transactions when there is a capacity overflow", () => { 
   const dllCapTest = new TxHeap(5);
   expect(MempoolTester.testCapacityLimit(dllCapTest,5, txValsOverflow, expectedOverflowResult)).toEqual(true);
}); 
