import type { GeckoProcessor } from "./gecko-processor";

export class GeckoProcessorInflate implements GeckoProcessor {

    parse(input: string): string {
        // todo use pako `npm install pako` https://stackoverflow.com/questions/14620769/decompress-gzip-and-zlib-string-in-javascript
        throw new Error("Method not implemented.");
    }

}