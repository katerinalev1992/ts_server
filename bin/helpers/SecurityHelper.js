"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class SecurityHelper {
    static generatePasswordHash(password) {
        let secret = 'cucumber';
        return crypto.createHmac('sha1', secret).update(password).digest('hex');
    }
    static validatePassword(password, hash) {
        return SecurityHelper.generatePasswordHash(password) === hash;
    }
}
exports.default = SecurityHelper;
