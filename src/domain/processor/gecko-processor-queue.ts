import type { GeckoProcessor } from "./gecko-processor";

export class GeckoProcessorQueue implements GeckoProcessor {

    processors: GeckoProcessor[];

    constructor(processors: GeckoProcessor[]) {
        this.processors = processors;
    }

    parse(input: string): string {
        let output = input;
        for (let index = 0; index < this.processors.length; index++) {
            const processor = this.processors[index];
            output = processor.parse(output);
        }
        return output;
    }

}