import App from '../App';
import User from '../models/User';
import UserDataProvider from '../providers/UserDataProvider';
import SecurityService from '../helpers/SecurityService';

export default class UserController {
    private userProviderInstance: UserDataProvider;

    constructor(private app: App) {
        this.userProviderInstance = this.app.providers.user;
    }

    findAll(onLoad: (err: string, data: User[]) => void) {
        this.userProviderInstance.select({}, onLoad);
    }

    findByEmail(email: string, onLoad: (data: User | null) => void, onError: (msg: string, code: number) => void) {
        this.userProviderInstance.findOne({email: email}, (err, data) => {
            if (err) {
                onError(err.message, 500);
            } else {
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }

    create(data: any, onCreate: any, onError: (msg: string, code: number) => void) {
        let emailPattern = /^[a-z0-9_-]{4,}\@[-a-z0-9]{3,}\.[a-z]{2,3}$/;

        if (!emailPattern.test(data.email) || !data.password.length) {
            onError("Incorrect email or password", 400);
        } else {
            this.findByEmail(data.email, (result) => {
                if (!result) {
                    let user = new User();
                    user.name = data.name || data.email;
                    user.email = data.email;
                    user.password = SecurityService.generatePswdHash(data.password);

                    this.userProviderInstance.create(user, (err, newData) => {
                        if (err !== null) {
                            onError(err.message, 500);
                        } else {
                            onCreate(newData);
                        }
                    });
                } else {
                    onError("The user is already exists", 400);
                }
            }, onError);
        }
    }

    removeById(id: string, onRemove: any) {
        this.userProviderInstance.delete({_id: id}, onRemove);
    }

    updateById(id: string, newData: User, onUpdate: any) {
        this.userProviderInstance.update({_id: id}, newData, onUpdate)
    }
}