import type { GeckoMetadata } from "../model/gecko-metadata";
import type { StoredMetadata } from "../model/stored-metadata";
import type MetadataDao from "../persistence/dao-metadata";
import type { GeckoFacade, MetadataListProps } from "./gecko-facade";

export default class GeckoFacadeSaving implements GeckoFacade {

    private facade: GeckoFacade;
    private storage: MetadataDao;

    constructor(
        facade: GeckoFacade,
        storage: MetadataDao
    ) {
        this.facade = facade
        this.storage = storage
    }

    async getMetadata(input: string): Promise<GeckoMetadata> {
        const encoder = new TextEncoder()
        const data = encoder.encode(input)
        const hash = await crypto.subtle.digest("SHA-1", data)
        const hashArray = Array.from(new Uint8Array(hash))
        const hashHex = hashArray.map(b => b.toString(16)).join('')
        const metadata: StoredMetadata = {
            id: hashHex,
            metadata: input
        }
        await this.storage.add(metadata)
        return await this.facade.getMetadata(input);
    }

    async getMetadataList(props: MetadataListProps): Promise<GeckoMetadata[]> {
        const items = await this.storage.get(props.offset ?? 0, props.limit ?? 10)
        return Promise.all(items.map((it) => this.facade.getMetadata(it.metadata)))
    }

}