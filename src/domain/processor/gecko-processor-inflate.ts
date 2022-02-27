import type { GeckoProcessor } from "./gecko-processor";
import pako from "pako";

export class GeckoProcessorInflate implements GeckoProcessor {

    private processor: GeckoProcessor;

    constructor(processor: GeckoProcessor) {
        this.processor = processor
    }

    async parse(input: string): Promise<Uint8Array> {
        return this.processor.parse(input)
            .then((it) => pako.ungzip(it))
    }

}