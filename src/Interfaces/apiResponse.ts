export type ApiResponse = {
    statusCode: number;
    isSucess: boolean;
    messageErrors?: Array<string>;
    result: any;
};