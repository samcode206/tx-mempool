import { existsSync, readFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { writeLocations, txAttrs } from "../../types/types";
import { writeTxs } from "../writer";

const path : string = resolve(__dirname, "..", "..", "..", "transactions", "out", writeLocations.test);

afterEach(()=>{
    unlinkSync(path);
});

it("should write to specified file location in the out folder", () => {
    const arr : Array<txAttrs>= [{
        Gas: 1,
        FeePerGas: 0.001,
        TxHash: "testHash", 
        Signature: "testSig"
    }];

    writeTxs(arr, writeLocations.test);

  
    
    expect(existsSync(path)).toEqual(true); 
    
}); 


it("should write a file that follows the same format as the transactions.txt file", () => {
    const arr : Array<txAttrs>= [{
        Gas: 1,
        FeePerGas: 0.001,
        TxHash: "testHash", 
        Signature: "testSig"
    },
{
    Gas: 2,
    FeePerGas: 0.002,
    TxHash: "testHash2", 
    Signature: "testSig2"
}];

    writeTxs(arr, writeLocations.test);
  

    expect(readFileSync(path,"utf8")).toEqual(`TxHash=testHash Gas=1 FeePerGas=0.001 Signature=testSig
TxHash=testHash2 Gas=2 FeePerGas=0.002 Signature=testSig2
`)
}); 
