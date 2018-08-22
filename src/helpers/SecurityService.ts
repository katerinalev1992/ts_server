import * as crypto from 'crypto';

export default class SecurityService {

    static generatePswdHash(password: string): string {
        let secret = 'typescript';
        return crypto.createHmac('sha1', secret).update(password).digest('hex');
    }

    static validatePswd(password: string, hash: string): boolean {
        return SecurityService.generatePswdHash(password) === hash;
    }
}