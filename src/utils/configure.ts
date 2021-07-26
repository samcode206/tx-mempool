import path from "path";
import { parse } from "yaml";
import { readFileSync } from "fs";
import { configAttrs, structs } from "../types/types";


export default function configure () : configAttrs {
   const configFile = path.resolve(__dirname, "..", "..", "mempool.config.yaml");

   const config = parse(readFileSync(configFile, "utf8"));
   if (config.dataStruct !== structs.dll && config.dataStruct !== structs.heap){
      console.error(config.dataStruct, " not supported");
      throw new Error("unsupported data structure please pick either : DLL or HEAP")
   }
   return config; 
}; 
