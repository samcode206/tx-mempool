import { EventEmitter } from "events";
import { txAttrs } from "../types/types";

/*
    this module is responsible for emiting events whenever we remove a lowest priority transactions and 
    I have set up a listener to handle these events and take care collecting the low priority transactions 
*/


export enum txEvents {
    trashed = "trashedTransaction",
}

export const transactionEvents = new EventEmitter();


export const emitTrashedTransaction = (tx : txAttrs) => {
    transactionEvents.emit(txEvents.trashed, tx); 
}; 
