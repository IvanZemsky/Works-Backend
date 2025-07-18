// src/common/middleware/refresh.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { UserService } from "src/user/user.service"
import { CookieService } from "../cookie.service"
import { TokenService } from "../token.service"

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
   constructor(
      private readonly tokenService: TokenService,
      private readonly userService: UserService,
   ) {}

   async use(req: Request, res: Response, next: NextFunction) {
      const accessToken = req.cookies[CookieService.accessTokenKey]
      if (!accessToken) {
         // без токена — просто пойдём дальше, Guard выбросит 401
         return next()
      }

      // пробуем верифицировать access-токен
      const userData = await this.tokenService.validateAccessToken(accessToken)
      if (userData) {
         // всё ок, Guard его примет
         return next()
      }

      // access-токен некорректен или истёк — пробуем refresh
      const decoded = this.tokenService.decode(accessToken)
      if (!decoded?.sub) {
         return next()
      }

      const user = await this.userService.findOneById(decoded.sub)
      if (!user?.refreshToken) {
         return next()
      }

      const refreshData = await this.tokenService.validateRefreshToken(user.refreshToken)
      if (!refreshData) {
         return next()
      }

      // генерируем новые токены
      const tokens = await this.tokenService.generateJWTTokens(user.id, user.role)
      await this.userService.storeRefreshToken(user.id, tokens.refreshToken)

      // ставим новый access-token в куку
      res.cookie(CookieService.accessTokenKey, tokens.accessToken, {
         httpOnly: true,
         secure: true,
         sameSite: "lax",
         expires: new Date(Date.now() + 20 * 1000),
      })

      next()
   }
}
