import type { GeckoProcessor } from "../processor/gecko-processor";

export interface GeckoProcessorFactory {

    getProcessor(): GeckoProcessor

}