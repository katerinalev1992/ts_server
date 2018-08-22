import { Request, Response } from 'express';

import App from '../App';
import IApplicationRoute from '../core/IApplicationRoute';
import AuthentificationController from '../controllers/AuthentificationController';
import UserController from '../controllers/UserController';

const UserRoute: IApplicationRoute = {
    createRouter(router) {
        let app = App.getInstance();
        let AuthCtrl = new AuthentificationController(app);
        let UserCtrl = new UserController(app);

        return router()
            .use(AuthentificationController.validateSession)
            .get('/', (req: Request, res: Response) => {
                UserCtrl.findAll((err: any, data: any) => {
                    res.send({users: data});
                });
            })
            .post('/add', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    UserCtrl.create(req.body, (newData: any) => {
                        res.send({userCreated: newData});
                    }, (msg, code) => {
                        res.send({message: msg, code: code});
                    });
                }
            })
            .post('/login', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    AuthCtrl.login(req, res);
                }
            })
            .get(
                '/logout',
                AuthCtrl.logout
            );
    }
};

export default UserRoute;