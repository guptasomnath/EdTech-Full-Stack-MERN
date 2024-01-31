export interface IErrorResponse {
    success : boolean;
    statusCode : number;
    message : string;
}

export interface ISuccessResponse <T = null> extends IErrorResponse {
    data : T
}