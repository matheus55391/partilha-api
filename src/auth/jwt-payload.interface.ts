export interface JwtPayload {
  sub: string; // user id
  email: string;
  name?: string;
  image?: string;
}
