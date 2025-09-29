// errors.ts
export type HttpError = Error & { status: number };

export function createHttpError(status: number, message: string): HttpError {
    const err = new Error(message) as HttpError;
    err.status = status;
    return err;
}

export const unauthorizedError = (msg = 'Unauthorized') => createHttpError(401, msg);

export const notFoundError = (msg = 'Not Found') => createHttpError(404, msg);
