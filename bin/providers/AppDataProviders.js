"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDataProvider_1 = require("./UserDataProvider");
class AppDataProviders {
    constructor() {
        this.store = this.getProviders()
            .map(provider => new provider());
    }
    get user() {
        return this.getInstanceProvider(UserDataProvider_1.default);
    }
    getInstanceProvider(typeProvider) {
        let items = this.store.filter((provider) => {
            if (provider instanceof typeProvider) {
                return provider;
            }
        });
        return items.length > 0 ? items[0] : null;
    }
    getProviders() {
        return [
            UserDataProvider_1.default
        ];
    }
}
exports.default = AppDataProviders;
