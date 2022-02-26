import type { GeckoProcessor } from "./gecko-processor";

export class GeckoProcessorQueue implements GeckoProcessor {

    processors: GeckoProcessor[];

    constructor(processors: GeckoProcessor[]) {
        this.processors = processors;
    }

    async parse(input: string): Promise<string> {
        let output = input;
        for await (const processor of this.processors) {
            output = await processor.parse(output);
        }
        return output;
    }

}

export class GeckoLogging implements GeckoProcessor {

    parse(input: string): Promise<string> {
        console.log(input)
        return promiseOf(input);
    }

}

function promiseOf<type>(argument: type): Promise<type> {
    return new Promise((resolve) => resolve(argument))
}