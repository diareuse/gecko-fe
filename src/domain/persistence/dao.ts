import type { IDBPDatabase, IDBPObjectStore, IDBPTransaction, StoreNames } from "idb";
export declare type DatabaseFactory = () => Promise<IDBPDatabase>

export default abstract class Dao {

    private database: IDBPDatabase | undefined;
    private databaseFactory: DatabaseFactory
    protected name: string;

    constructor(factory: DatabaseFactory, name: string) {
        this.databaseFactory = factory
        this.name = name
    }

    // ---

    protected async inReadWriteTransaction<T>(
        body: (store: IDBPObjectStore<unknown, [string], string, "readwrite">) => Promise<T>
    ): Promise<T> {
        const database = await this.getDatabase()
        return this.handleTransaction(database.transaction(this.name, "readwrite"), async (t) => {
            const s = t.objectStore(this.name)
            return await body(s)
        })
    }

    protected async inReadTransaction<T>(
        body: (store: IDBPObjectStore<unknown, [string], string, "readonly">) => Promise<T>
    ): Promise<T> {
        const database = await this.getDatabase()
        return this.handleTransaction(database.transaction(this.name, "readonly"), async (t) => {
            const s = t.objectStore(this.name)
            return await body(s)
        })
    }

    private async handleTransaction<T, a, b extends ArrayLike<StoreNames<a>>, c extends IDBTransactionMode>(
        transaction: IDBPTransaction<a, b, c>,
        body: (transaction: IDBPTransaction<a, b, c>) => Promise<T>
    ): Promise<T> {
        try {
            const r = await body(transaction)
            transaction.commit()
            return r
        } catch (err) {
            transaction.abort()
            throw err
        }
    }

    // ---

    private async getDatabase(): Promise<IDBPDatabase> {
        const database = this.database
        if (database) {
            return database
        }
        this.database = await this.databaseFactory()
        return this.database!
    }

}