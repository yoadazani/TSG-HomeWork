import { Express } from 'express';
import countriesR from "../countriesR";

export const declareRoutes = (app: Express) => {
    app.use('/api', countriesR);
};
