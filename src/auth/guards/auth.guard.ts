import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { CookieService } from "../cookie.service"
import { TokenService } from "../token.service"

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private tokenService: TokenService
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()

      const accessToken = request.cookies[CookieService.accessTokenKey]; 

      if (!accessToken) {
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
