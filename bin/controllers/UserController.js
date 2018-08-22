"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const SecurityHelper_1 = require("../helpers/SecurityHelper");
class UserController {
    constructor(app) {
        this.app = app;
        this.userProvider = this.app.providers.user;
    }
    findAll(onLoad) {
        this.userProvider.select({}, onLoad);
    }
    findByEmail(email, onLoad, onError) {
        this.userProvider.findOne({ email: email }, (err, data) => {
            if (err) {
                onError(err.message, 500);
            }
            else {
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }
    create(data, onCreate, onError) {
        let emailPattern = /^[a-z0-9_-]{4,}\@[-a-z0-9]{3,}\.[a-z]{2,3}$/;
        if (!emailPattern.test(data.email) || !data.password.length) {
            onError("Неверно указан email или пароль", 400);
        }
        else {
            this.findByEmail(data.email, (result) => {
                if (!result) {
                    let user = new User_1.default();
                    user.name = data.name || data.email;
                    user.email = data.email;
                    user.password = SecurityHelper_1.default.generatePasswordHash(data.password);
                    this.userProvider.create(user, (err, newData) => {
                        if (err !== null) {
                            onError(err.message, 500);
                        }
                        else {
                            onCreate(newData);
                        }
                    });
                }
                else {
                    onError("Пользователь с указанным email уже существует", 400);
                }
            }, onError);
        }
    }
    removeById(id, onRemove) {
        this.userProvider.delete({ _id: id }, onRemove);
    }
    updateById(id, newData, onUpdate) {
        this.userProvider.update({ _id: id }, newData, onUpdate);
    }
}
exports.default = UserController;
