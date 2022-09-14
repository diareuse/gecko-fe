import type { GeckoMetadata } from "../model/gecko-metadata";

export declare type MetadataListProps = { offset?: number, limit?: number }

export interface GeckoFacade {
    getMetadata(input: string): Promise<GeckoMetadata>
    getMetadataList(props: MetadataListProps): Promise<GeckoMetadata[]>
    delete(data: GeckoMetadata): Promise<void>
}