import type { GeckoProcessor } from "./gecko-processor";
import base64 from "base64-js"
import { promiseOf } from "../tool/promise";

export class GeckoProcessorBase64Decode implements GeckoProcessor {

    parse(input: string): Promise<Uint8Array> {
        return promiseOf(() => base64.toByteArray(input))
    }

}
