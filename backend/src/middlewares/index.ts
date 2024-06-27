import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import express, { Express } from 'express';
import path from 'path';
import { rateLimiter } from './rate-limiting';
import {connectDB} from "../db/connectDB";
import {populateDatabaseIfEmpty} from "../utils/importCountries";

export const declareMiddlewares = (app: Express) => {
    // Middlewares

    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    // app.use(rateLimiter); // rate limiting middleware


    app.use(connectDB) // connect to the database
    app.use(populateDatabaseIfEmpty) // populate the database with countries if the database is empty

    return app;
};
