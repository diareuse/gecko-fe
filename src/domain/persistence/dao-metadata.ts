import type { IDBPDatabase } from "idb";
import type { StoredMetadata } from "../model/stored-metadata";
import Dao, { type DatabaseFactory } from "./dao";

export default class MetadataDao extends Dao {

    public static Name = "metadata"

    constructor(
        factory: DatabaseFactory
    ) {
        super(factory, MetadataDao.Name)
    }

    async add(model: StoredMetadata): Promise<void> {
        await this.inReadWriteTransaction((store) => store.add(model))
    }

    async remove(key: string): Promise<void> {
        await this.inReadWriteTransaction((store) => store.delete(key))
    }

    async get(offset: number, limit: number): Promise<StoredMetadata[]> {
        return await this.inReadTransaction(async (store) => {
            const cursor = await store.openCursor()
            cursor?.advance(offset)
            if (!cursor) {
                throw "Cannot open cursor!"
            }

            const items: StoredMetadata[] = []
            let count = 0
            let item: StoredMetadata | undefined = undefined
            do {
                item = (await cursor.continue())?.value
                if (item) {
                    items.push(item)
                    count++
                }
            } while (item && count < limit)

            return items
        })
    }

}