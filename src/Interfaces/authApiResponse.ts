export type authApiResponse = {
  data?: {
    statusCode: number;
    isSucess: boolean;
    messageErrors?: Array<string>;
    result: any;
  };
  error?: any;
};
