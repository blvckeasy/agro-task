export interface VerifyUser {
    id: number;
    username: string;
    userAgent: string;
    iat?: number;
    exp?: number;
}