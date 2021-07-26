import parseRawTransactionToObject from "../parser";



it("should load the file from the transactions folder transaction.txt and load into an array every transaction", () => {
    const result = parseRawTransactionToObject();   
    expect(result).toHaveLength(7500);
}); 

it("should parse the output to an array of objects that follow the txAttrs interface", () => {
    const result = parseRawTransactionToObject();   
    expect(result).toBeInstanceOf(Array);
    
    for (const tx of result){
        expect(tx).toHaveProperty("Gas");
        expect(tx).toHaveProperty("TxHash");
        expect(tx).toHaveProperty("FeePerGas");
        expect(tx).toHaveProperty("Signature");
        
        expect(typeof tx.Gas).toBe("number");
        expect(typeof tx.TxHash).toBe("string");
        expect(typeof tx.Signature).toBe("string");
        expect(typeof tx.FeePerGas).toBe("number");
};
});

