import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CookieService {
  static accessTokenKey = "access_token";
  static refreshTokenKey = "refresh_token";

  constructor(private readonly configService: ConfigService) {}

  setAccessToken(res: Response, accessToken: string): void {
    res.cookie(CookieService.accessTokenKey, accessToken, {
      httpOnly: true,
      secure: this.isProduction(),
      sameSite: 'strict',
      path: '/',
    });
  }

  setRefreshToken(res: Response, refreshToken: string): void {
    res.cookie(CookieService.refreshTokenKey, refreshToken, {
      httpOnly: true,
      secure: this.isProduction(),
      sameSite: 'strict',
      path: '/refresh',
    });
  }

  private isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }


  removeTokensFromCookie(res: Response): void {
    res.clearCookie(CookieService.accessTokenKey);
    res.clearCookie(CookieService.refreshTokenKey);
  }

  removeRefreshTokenFromCookie(res: Response): void {
    res.clearCookie(CookieService.refreshTokenKey);
  }
}