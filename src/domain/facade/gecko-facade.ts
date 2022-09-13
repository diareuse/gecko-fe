import type { GeckoMetadata } from "../model/gecko-metadata";

export interface GeckoFacade {
    getMetadata(input: string): Promise<GeckoMetadata>
    getMetadataList(offset: number | undefined, limit: number | undefined): Promise<GeckoMetadata[]>
}