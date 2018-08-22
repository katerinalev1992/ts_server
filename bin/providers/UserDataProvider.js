"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataProvider_1 = require("./DataProvider");
class UserDataProvider extends DataProvider_1.default {
    constructor() {
        super('User');
    }
    select(where, onSelect) {
        this.db_store.find(where, onSelect);
    }
    create(data, onCreate) {
        this.db_store.insert(data, onCreate);
    }
    update(where, newData, onUpdate) {
        this.db_store.update(where, { $set: newData });
    }
    delete(where, onDelete) {
        this.db_store.remove(where, { multi: true }, onDelete);
    }
    findOne(where, onSelect) {
        this.db_store.findOne(where, onSelect);
    }
    onLoadStore(err) {
        if (err !== null) {
            console.error(err);
        }
    }
}
exports.default = UserDataProvider;
