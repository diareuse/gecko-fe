import type { IDBPCursorWithValue } from "idb";
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
        await this.inReadWriteTransaction((store) => store.put(model))
    }

    async remove(key: string): Promise<void> {
        await this.inReadWriteTransaction((store) => store.delete(key))
    }

    async get(offset: number, limit: number): Promise<StoredMetadata[]> {
        return await this.inReadTransaction(async (store) => {
            let cursor = await store.openCursor()
            if (cursor && offset > 0)
                cursor = await cursor.advance(offset)

            const items: StoredMetadata[] = []
            let count = 0
            let item: StoredMetadata | undefined = cursor?.value
            while (item && count < limit) {
                if (item) {
                    items.push(item)
                    count++
                }
                cursor = await cursor?.continue() ?? null
                item = cursor?.value
            }

            return items
        })
    }

}