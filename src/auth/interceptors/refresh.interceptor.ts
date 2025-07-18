import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
   UnauthorizedException,
} from "@nestjs/common"
import { Observable, from } from "rxjs"
import { Response } from "express"
import { UserService } from "src/user/user.service"
import { CookieService } from "../cookie.service"
import { TokenService } from "../token.service"

@Injectable()
export class AuthInterceptor implements NestInterceptor {
   constructor(
      private readonly tokenService: TokenService,
      private readonly userService: UserService,
      private readonly cookieService: CookieService,
   ) {}

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest()
      const response = context.switchToHttp().getResponse<Response>()

      return from(this.handleAuth(request, response, next))
   }

   private async handleAuth(request: any, response: Response, next: CallHandler) {
      const accessToken = request.cookies[CookieService.accessTokenKey]

      console.log("started     ", accessToken)

      if (!accessToken) {
         throw new UnauthorizedException("No access token cookie")
      }

      const userData = await this.tokenService.validateAccessToken(accessToken)
      if (userData) {
         console.log(true, true, true)
         request.user = userData
         return next.handle()
      }

      const decoded = this.tokenService.decode(accessToken)
      const userId = decoded?.sub
      if (!userId) {
         throw new UnauthorizedException("Cannot decode expired access token")
      }

      const user = await this.userService.findOneById(userId)
      if (!user || !user.refreshToken) {
         throw new UnauthorizedException("Refresh token missing")
      }

      const refreshData = await this.tokenService.validateRefreshToken(user.refreshToken)
      if (!refreshData) {
         await this.userService.removeRefreshToken(user.id)
         throw new UnauthorizedException("Refresh token expired")
      }

      const tokens = await this.tokenService.generateJWTTokens(user.id, user.role)
      await this.userService.storeRefreshToken(user.id, tokens.refreshToken)

      console.log("refreshed   ", tokens.accessToken, tokens.accessToken === accessToken)

      this.cookieService.setAccessToken(response, tokens.accessToken)

      request.user = { sub: user.id, role: user.role }
      return next.handle()
   }
}
