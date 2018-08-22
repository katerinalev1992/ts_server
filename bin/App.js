"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const AppRoute_1 = require("./routes/AppRoute");
const AppDataProviders_1 = require("./providers/AppDataProviders");
class App {
    constructor(config) {
        this.config = config;
        if (App.app instanceof App) {
            throw new Error('Нельзя создать более одного экземпляра приложения');
        }
        this.config = config;
        this.expApp = express();
        App.app = this;
    }
    static getInstance() {
        return App.app;
    }
    run() {
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'chuck norris',
            cookie: { maxAge: 3600000 }
        }));
        this.expApp.use(bodyParser.urlencoded({ extended: false }));
        this.expApp.use((req, res, next) => {
            res.contentType('application/json');
            next();
        });
        this.dataProviders = new AppDataProviders_1.default();
        let appRouter = new AppRoute_1.default();
        appRouter.mount(this.expApp);
        this.expApp.listen(this.config.listenPort, (err) => {
            if (err !== undefined) {
                console.log(err);
            }
            else {
                console.log("Server run on port: " + this.config.listenPort);
            }
        });
    }
    get providers() {
        return this.dataProviders;
    }
}
exports.default = App;
