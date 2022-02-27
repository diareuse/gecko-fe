import type { GeckoProcessor } from "../processor/gecko-processor";
import { GeckoProcessorBase64Decode } from "../processor/gecko-processor-base64-decode";
import { GeckoProcessorInflate } from "../processor/gecko-processor-inflate";
import type { GeckoProcessorFactory } from "./gecko-processor-factory";

export class GeckoProcessorFactoryDefault implements GeckoProcessorFactory {

    getProcessor(): GeckoProcessor {
        var processor: GeckoProcessor
        processor = new GeckoProcessorBase64Decode();
        processor = new GeckoProcessorInflate(processor);
        return processor
    }

}