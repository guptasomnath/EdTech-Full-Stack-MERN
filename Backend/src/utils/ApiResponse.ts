type DataType = string | number | object | [] | null;

export class ApiResponse {
    private success :boolean;
    private statusCode : number;
    private message : string;
    private data : DataType;

    constructor(statusCode: number, message: string, data? : DataType) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
        if(data){
            this.data = data;
        }
    }
}