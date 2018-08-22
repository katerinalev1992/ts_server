"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityHelper_1 = require("../helpers/SecurityHelper");
class AuthController {
    constructor(app) {
        this.app = app;
        this.userProvider = this.app.providers.user;
    }
    login(req, res) {
        let email = req.body.email;
        let pswd = req.body.password;
        this.userProvider.findOne({ email: email }, (err, user) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                if (!user || !SecurityHelper_1.default.validatePassword(pswd, user.password)) {
                    res.send({ msg: 'Неверный email или пароль', code: 400 });
                }
                else {
                    user.lastVisit = Date.now().toString();
                    this.userProvider.update({ _id: user._id }, user, () => {
                        console.log(`User ${user.email} lastVisit: ${user.lastVisit}`);
                    });
                    req.session.userId = user._id;
                    res.send({ msg: 'Welcome' });
                }
            }
        });
    }
    logout(req, res) {
        let session = req.session;
        if (!session) {
            res.sendStatus(400);
        }
        else {
            session.destroy(() => {
                res.send({ msg: 'Logout success' });
            });
        }
    }
    checkSession(req, res, next) {
        let session = req.session;
        if (~['/login', '/add'].indexOf(req.path)) {
            if (!session.userId) {
                next();
            }
            else {
                res.sendStatus(406);
            }
        }
        else {
            if (session.userId) {
                next();
            }
            else {
                res.sendStatus(401);
            }
        }
    }
}
exports.default = AuthController;
