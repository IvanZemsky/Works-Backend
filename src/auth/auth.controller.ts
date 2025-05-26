import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { SignUpDTO } from "./auth.dto"

@Controller("auth")
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post("sign-up")
   async signUp(@Body() dto: SignUpDTO) {
      return await this.authService.registerUser(dto)
   }
}
