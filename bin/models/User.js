"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor() {
        let date = Date.now().toString();
        this.created = date;
        this.lastVisit = date;
    }
}
exports.default = User;
