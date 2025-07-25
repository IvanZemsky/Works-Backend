import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Post,
   Req,
   Res,
   UnauthorizedException,
   UseGuards,
   UseInterceptors,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { SignInDTO, SignUpDTO, TokenData } from "./auth.dto"
import { CookieService } from "./cookie.service"
import { Response, Request } from "express"
import { UserService } from "src/user/user.service"
import { TokenService } from "./token.service"
import { AuthGuard } from "./guards/auth.guard"
import {AuthInterceptor} from "./interceptors/refresh.interceptor"

@Controller("auth")
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly cookieService: CookieService,
      private readonly userService: UserService,
      private readonly tokenService: TokenService,
   ) {}

   @Post("sign-up")
   @HttpCode(HttpStatus.CREATED)
   async signUp(@Res({ passthrough: true }) res: Response, @Body() dto: SignUpDTO) {
      const accessToken = await this.authService.registerUser(dto)
      this.cookieService.setAccessToken(res, accessToken)
   }

   @Post("sign-in")
   @HttpCode(HttpStatus.NO_CONTENT)
   async signIn(@Res({ passthrough: true }) res: Response, @Body() dto: SignInDTO) {
      const accessToken = await this.authService.login(dto)
      this.cookieService.setAccessToken(res, accessToken)
   }

   @Get("check-session")
   @UseInterceptors(AuthInterceptor)
   async getSessionInfo(@Req() req: Request) {
      const sessionData = req["user"]
      return sessionData
   }

   @Post("sign-out")
   @HttpCode(HttpStatus.NO_CONTENT)
   @UseGuards(AuthGuard)
   async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const sessionData = req["user"] as TokenData
      this.cookieService.removeAccessTokenFromCookie(res)
      this.authService.logout(sessionData.sub)
   }
}
