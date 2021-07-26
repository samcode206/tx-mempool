import { EventEmitter } from "events";
import { txAttrs } from "../types/types";


export enum txEvents {
    trashed = "trashedTransaction",
}

export const transactionEvents = new EventEmitter();


export const emitTrashedTransaction = (tx : txAttrs) => {
    transactionEvents.emit(txEvents.trashed, tx); 
}; 
