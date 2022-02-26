import type { GeckoProcessor } from "../processor/gecko-processor";
import { GeckoProcessorBase64Decode } from "../processor/gecko-processor-base64-decode";
import { GeckoProcessorInflate } from "../processor/gecko-processor-inflate";
import { GeckoLogging, GeckoProcessorQueue } from "../processor/gecko-processor-queue";
import type { GeckoProcessorFactory } from "./gecko-processor-factory";

export class GeckoProcessorFactoryDefault implements GeckoProcessorFactory {

    getProcessor(): GeckoProcessor {
        return new GeckoProcessorQueue([
            new GeckoLogging(),
            new GeckoProcessorBase64Decode(),
            new GeckoLogging(),
            new GeckoProcessorInflate(),
            new GeckoLogging()
        ])
    }

}