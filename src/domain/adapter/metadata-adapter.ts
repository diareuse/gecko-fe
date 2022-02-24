import type { GeckoMetadata } from "@/domain/model/gecko-metadata";

export interface MetadataAdapter {
    adapt(query: string): GeckoMetadata
}