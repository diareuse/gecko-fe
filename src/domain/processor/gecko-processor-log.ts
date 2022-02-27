import type { GeckoProcessor } from "./gecko-processor";

export class GeckoProcessorLog implements GeckoProcessor {

    private processor: GeckoProcessor;

    constructor(processor: GeckoProcessor) {
        this.processor = processor
    }

    async parse(input: string): Promise<Uint8Array> {
        return this.processor.parse(input)
            .then((it) => { console.log(it); return it })
    }

}