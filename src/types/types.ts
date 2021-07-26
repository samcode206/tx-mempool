export interface txAttrs {
    TxHash : string
    Gas : number
    FeePerGas : number
    Signature : string
};

export interface configAttrs {
    maximumPoolSize: number
    dataStruct: string
    saveRejectedTransactions : boolean
};

export enum rawProps {
    TxHash = "TxHash=",
    Gas = "Gas=",
    FeePerGas = "FeePerGas=",
    Signature= "Signature=",
};

export enum writeLocations {
    prioritized = "prioritized-transactions.txt",
    rejected = "rejected-transactions.txt",
    test = "test.txt"
};

export enum structs {
    heap = "HEAP",
    dll = "DLL",
}
