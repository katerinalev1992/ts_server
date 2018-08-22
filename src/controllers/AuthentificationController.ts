import { Request, Response, NextFunction } from 'express';

import App from '../App';
import UserDataProvider from '../providers/UserDataProvider';
import SecurityService from '../helpers/SecurityService';

export default class AuthentificationController {
    private userProviderInstance: UserDataProvider;

    constructor(private app: App) {
        this.userProviderInstance = this.app.providers.user;
    }

    login(req: Request, res: Response) {
        let email = req.body.email;
        let password = req.body.password;

        this.userProviderInstance.findOne({email: email}, (err, user) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (!user || !SecurityService.validatePswd(password, user.password)) {
                    res.send({msg:'Incorrect password', code: 400});
                } else {
                    user.lastVisit = Date.now().toString();
                    this.userProviderInstance.update({_id: user._id}, user, () => {
                        console.log(`User ${user.email} lastVisit: ${user.lastVisit}`);
                    });

                    req.session.userId = user._id;
                    res.send({msg:'Welcome'});
                }
            }
        });
    }
    logout(req: Request, res: Response) {
        let session = req.session;
        if (!session) {
            res.sendStatus(400);
        } else {
            session.destroy(() => {
                res.send({msg:'Logout success'});
            });
        }
    }
    static validateSession(req: Request, res: Response, next: NextFunction) {
        let session = req.session;
        if (~['/login', '/add'].indexOf(req.path)) {
            if (!session.userId) {
                next();
            } else {
                res.sendStatus(406);
            }
        } else {
            if (session.userId) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
    }
}