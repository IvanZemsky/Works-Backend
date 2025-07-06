import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "src/user/user.service"
import { AuthConfigService } from "../auth.config"
import { CookieService } from "../cookie.service"
import { TokenService } from "../token.service"

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private tokenService: TokenService
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()

      const authHeader = request.headers.authorization as string
      if (!authHeader) {
         throw new UnauthorizedException()
      }

      const [authHeaderType, accessToken] = authHeader.split(" ")
      if (authHeaderType !== "Bearer" || !accessToken) {
         throw new UnauthorizedException()
      }

      const userData = await this.tokenService.validateAccessToken(accessToken)
      if (!userData) {
         throw new UnauthorizedException()
      }

      request.user = userData

      return true
   }
}
