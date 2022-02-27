import type { GeckoMetadata } from "@/domain/model/gecko-metadata";

export interface MetadataAdapter {
    adapt(query: string): GeckoMetadata
    parse(array: Uint8Array): Promise<string>
}