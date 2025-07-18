import { Injectable } from "@nestjs/common"
import { Response } from "express"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class CookieService {
   static accessTokenKey = "access_token"
   static refreshTokenKey = "refresh_token"

   constructor(private readonly configService: ConfigService) {}

   setAccessToken(res: Response, token: string): void {
      res.cookie(CookieService.accessTokenKey, token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax",
         path: "/",
         maxAge: 24 * 60 * 60 * 1000,
      })
   }

   getMaxAgeOfAccessToken(): number | undefined {
      const maxAccessTokenAge = this.configService.get<string>("JWT_ACCESS_EXPIRES_IN")
      if (!maxAccessTokenAge) return undefined

      return parseInt(maxAccessTokenAge)
   }

   removeAccessTokenFromCookie(res: Response): void {
      res.clearCookie(CookieService.accessTokenKey, {
         path: "/",
      })
   }
}
