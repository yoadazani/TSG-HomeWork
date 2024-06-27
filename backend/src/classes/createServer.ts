import 'express-async-errors';
import express, {Express} from 'express';
import dotenv from 'dotenv';
import {declareMiddlewares} from '../middlewares';
import {declareRoutes} from '../routes/declare_routes';
import {HttpServerType} from '../types/httpServerType';
import {sequelize} from "../db/connectDB";

class CreateServer {

    private readonly port: number

    private readonly app: Express

    private readonly httpServer: HttpServerType

    constructor() {
        dotenv.config()

        this.port = +process.env.PORT! ?? 3000
        this.app = express()

        declareMiddlewares(this.app)

        declareRoutes(this.app)

        this.httpServer = this.app.listen(this.port, () => {
            const serverUrl = `http://localhost:${this.port}`

            const message = `${serverUrl} is up and running!`

            console.log(message)
        })
    }

    public getApp(): Express {
        return this.app
    }
}

export default CreateServer