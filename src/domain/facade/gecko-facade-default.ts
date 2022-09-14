import type { MetadataAdapter } from "../adapter/metadata-adapter";
import type { GeckoMetadata } from "../model/gecko-metadata";
import type { GeckoProcessor } from "../processor/gecko-processor";
import type { GeckoFacade, MetadataListProps } from "./gecko-facade";

export class GeckoFacadeDefault implements GeckoFacade {

    private processor: GeckoProcessor;
    private adapter: MetadataAdapter;

    constructor(
        processor: GeckoProcessor,
        adapter: MetadataAdapter
    ) {
        this.processor = processor;
        this.adapter = adapter;
    }

    async getMetadata(input: string): Promise<GeckoMetadata> {
        const rawValue = await this.processor.parse(input)
        const value = await this.adapter.parse(rawValue)
        const metadata = this.adapter.adapt(value)
        return metadata;
    }

    async getMetadataList(props: MetadataListProps): Promise<GeckoMetadata[]> {
        return [] // no-op
    }

    async delete(data: GeckoMetadata): Promise<void> {
        // no-op
    }

}