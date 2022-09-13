import type { GeckoMetadata } from "../model/gecko-metadata";
import type { StoredMetadata } from "../model/stored-metadata";
import type MetadataDao from "../persistence/dao-metadata";
import type { GeckoFacade } from "./gecko-facade";

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
        let metadata: StoredMetadata = {
            id: crypto.randomUUID(),
            metadata: input
        }
        await this.storage.add(metadata)
        return await this.facade.getMetadata(input);
    }

}