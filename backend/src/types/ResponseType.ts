type SuccessType<T> = {
    data: T;
    message: string;
};

type ErrorType<T> = {
    error: T;
    message: string;
};

export type ResponseType<T> = | SuccessType<T> | ErrorType<T>;
