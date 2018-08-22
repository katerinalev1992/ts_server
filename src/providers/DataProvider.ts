import * as nedb from 'nedb';
import * as path from 'path';

export default abstract class DataProvider {
    static readonly ROOT_DB_STORE = path.normalize(__dirname + '/../../db/');

    protected db_store: nedb;

    constructor(storeName = 'data') {
        this.db_store = new nedb({
            filename: DataProvider.ROOT_DB_STORE + storeName + '.db'
        });

        this.db_store.loadDatabase((err) => {
            this.onLoadStore(err);
        });
    }

    protected vacuumStore(): void {
        if (this.db_store instanceof nedb) {
            this.db_store.persistence.compactDatafile();
        }
    }

    protected abstract onLoadStore(err: any): void
}