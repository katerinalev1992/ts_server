import { Router } from 'express';

interface IApplicationRoute {
    createRouter(router: any): Router;
}

export default IApplicationRoute;