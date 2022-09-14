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
            metadata: input,
            date: new Date().getTime()
        }
        await this.storage.add(metadata)
        return await this.facade.getMetadata(input);
    }

    async getMetadataList(props: MetadataListProps): Promise<GeckoMetadata[]> {
        const items = await this.storage.get(props.offset ?? 0, props.limit ?? 10)
        const results = []
        for (const item of items) {
            try {
                const metadata = await this.facade.getMetadata(item.metadata)
                metadata.key = item.id
                metadata.date = item.date
                results.push(metadata)
            } catch (err) {
                console.error(err)
            }
        }
        return results
    }

    async delete(data: GeckoMetadata): Promise<void> {
        const key = data.key
        if (!key) {
            throw new Error("Key was not defined on this sobject")
        }
        await this.storage.remove(key)
    }

}