export interface JwtTokenDTO {
  httpStatus: number;
  message: string;
  responseBody: {
    token: string;
    expirationTime: string;
    username: string;
  };
}
