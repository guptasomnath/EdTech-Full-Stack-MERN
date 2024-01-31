class NewError extends Error {
    statusCode: number;
    isOperational: boolean;
    code: number;
    keyValue: any;
    message: string;
    path : string;
    kind : string;
}

export class ErrorHander extends NewError {
    constructor(message: string, statusCode: number) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = true;
    }
}