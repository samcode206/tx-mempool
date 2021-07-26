import { writeFileSync } from "fs";
import { resolve } from "path";
import { txAttrs, writeLocations } from "../types/types";


const marshalTxt = (txtList : txAttrs[]) : string => {
    let txtStr = ""; 
    
    for (const tx of txtList){
        txtStr += `TxHash=${tx.TxHash} Gas=${tx.Gas} FeePerGas=${tx.FeePerGas} Signature=${tx.Signature}\n`;
    };

    return txtStr; 
}; 

export function writeTxs (txList : txAttrs[], location : writeLocations) : void {
    const path : string = resolve(__dirname, "..", "..", "transactions", "out", location);
    writeFileSync(path, marshalTxt(txList));
};