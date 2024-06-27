import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';
import { ResponseType } from '../types/ResponseType';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof CustomError) {
        const errorType = err.serializeErrors();

        const response = {
            message: 'There was an error',
            error: err.serializeErrors(),
        } as ResponseType<typeof errorType>;
        return res.status(err.statusCode).json(response);
    }

    const errorType = err.message;
    const response = {
        message: 'There was an error',
        error: err.message,
    } as ResponseType<typeof errorType>;

    res.status(500).json(response);

    return next();
};

export { errorHandler };
