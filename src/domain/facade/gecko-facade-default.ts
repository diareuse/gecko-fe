import type { MetadataAdapter } from "../adapter/metadata-adapter";
import type { GeckoMetadata } from "../model/gecko-metadata";
import type { GeckoProcessor } from "../processor/gecko-processor";
import { promiseOf } from "../tool/promise";
import type { GeckoFacade } from "./gecko-facade";

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

    async getMetadataList(offset: number | undefined, limit: number | undefined): Promise<GeckoMetadata[]> {
        return [] // no-op
    }

}