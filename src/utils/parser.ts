import { readFileSync } from "fs"; 
import { resolve } from "path";
import {txAttrs , rawProps} from "../types/types";


export default function parseRawTransactionToObject() : Array<txAttrs> {
    // transactions file path 
    const rawTxs : string = resolve(__dirname, "..", "..", "transactions", "transactions.txt");

    // supports unix & windows used to seperate different tranasctions as they are split by new lines  
    const newLineRegex : RegExp = /\r?\n/g; 
    
    // creates an array with each element equaling to a single transaction 
    const transactionsArr = readFileSync(rawTxs).toString().split(newLineRegex);
    
    const transactions : Array<txAttrs> = []; 

   
    

    transactionsArr.forEach(t => {

        const hash : txAttrs = {
            Signature: "",
            Gas: -1,
            FeePerGas: -1,
            TxHash: "",
        };

        const props = t.split(' ');

            props.forEach(t => {
                if (t.startsWith(rawProps.FeePerGas)){
                hash.FeePerGas = parseFloat(t.substring(rawProps.FeePerGas.length, t.length));
                } else if (t.startsWith(rawProps.Gas)){
                    hash.Gas = parseInt(t.substring(rawProps.Gas.length, t.length));
                } else if (t.startsWith(rawProps.Signature)){
                    hash.Signature = t.substring(rawProps.Signature.length, t.length);
                } else if (t.startsWith(rawProps.TxHash)){
                    hash.TxHash = t.substring(rawProps.TxHash.length, t.length);
                }
            });
       
        transactions.push(hash);
    }); 
    
    
    return transactions;
}; 


