import { openDB, type IDBPDatabase } from "idb";
import MetadataDao from "./dao-metadata";

export default class Database {

    private instance: IDBPDatabase | undefined = undefined

    metadata(): MetadataDao {
        return new MetadataDao(() => this.getInstance())
    }

    // ---

    private async getInstance(): Promise<IDBPDatabase> {
        const instance = this.instance
        if (instance) {
            return instance
        }
        this.instance = await openDB("db", 1, {
            upgrade(database) {
                const metadata = database.createObjectStore(MetadataDao.Name, { keyPath: "id" })
                metadata.createIndex("idx-date", "date")
            }
        })
        return this.getInstance()
    }

}
