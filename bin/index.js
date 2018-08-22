"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const APP_CONFIG = {
    listenPort: 8080,
    appName: 'Example Application'
};
try {
    new App_1.default(APP_CONFIG).run();
}
catch (e) {
    console.error(e.message);
}
