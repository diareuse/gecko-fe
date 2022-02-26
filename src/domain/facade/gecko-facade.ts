import type { MetadataAdapter } from "../adapter/metadata-adapter";
import type { GeckoMetadata } from "../model/gecko-metadata";
import type { GeckoProcessor } from "../processor/gecko-processor";

export interface GeckoFacade {
    getMetadata(input: string): Promise<GeckoMetadata>
}