"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nedb = require("nedb");
const path = require("path");
class DataProvider {
    constructor(storeName = 'data') {
        this.db_store = new nedb({
            filename: DataProvider.ROOT_DB_STORE + storeName + '.db'
        });
        this.db_store.loadDatabase((err) => {
            this.onLoadStore(err);
        });
    }
    vacuumStore() {
        if (this.db_store instanceof nedb) {
            this.db_store.persistence.compactDatafile();
        }
    }
}
DataProvider.ROOT_DB_STORE = path.normalize(__dirname + '/../../db/');
exports.default = DataProvider;
