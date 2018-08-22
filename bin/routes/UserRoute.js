"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const AuthController_1 = require("../controllers/AuthController");
const UserController_1 = require("../controllers/UserController");
const UserRoute = {
    createRouter(router) {
        let app = App_1.default.getInstance();
        let AuthCtrl = new AuthController_1.default(app);
        let UserCtrl = new UserController_1.default(app);
        return router()
            .use(AuthentificationController.validateSession)
            .get('/', (req, res) => {
            UserCtrl.findAll((err, data) => {
                res.send({ users: data });
            });
        })
            .post('/add', (req, res) => {
            if (!req.body) {
                res.send({ msg: "Empty body request", code: 400 });
            }
            else {
                UserCtrl.create(req.body, (newData) => {
                    res.send({ userCreated: newData });
                }, (msg, code) => {
                    res.send({ message: msg, code: code });
                });
            }
        })
            .post('/login', (req, res) => {
            if (!req.body) {
                res.send({ msg: "Empty body request", code: 400 });
            }
            else {
                AuthCtrl.login(req, res);
            }
        })
            .get('/logout', AuthCtrl.logout);
    }
};
exports.default = UserRoute;
