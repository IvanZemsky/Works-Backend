import { Body, Controller, Post, Res } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { SignInDTO, SignUpDTO } from "./auth.dto"
import { CookieService } from "./cookie.service"
import { Response } from "express"

@Controller("auth")
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly cookieService: CookieService,
   ) {}

   @Post("sign-up")
   async signUp(@Res({ passthrough: true }) res: Response, @Body() dto: SignUpDTO) {
      const tokens = await this.authService.registerUser(dto)
      // пересмотреть (?)
      this.cookieService.setAccessToken(res, tokens.accessToken)
   }

   @Post("sign-in")
   async signIn(@Res({ passthrough: true }) res: Response, @Body() dto: SignInDTO) {
      const tokens = await this.authService.login(dto)
      // пересмотреть (?)
      this.cookieService.setAccessToken(res, tokens.accessToken)
   }

   @Post("sign-out")
   async logout(
      @Res({ passthrough: true }) res: Response,
      @Body() dto: { userId: string },
   ) {
      this.cookieService.removeTokensFromCookie(res)
      this.authService.logout(dto.userId)
   }
}
