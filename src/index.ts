import App from './App';

try {
    new App({
        port: 8080,
        applicationName: 'Example Application'
    }).run();
} catch (e) {
    console.error(e.message);
}