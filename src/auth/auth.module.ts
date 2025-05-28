import { forwardRef, Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { PasswordService } from "./password.service"
import { UserService } from "src/user/user.service"
import { UserModule } from "src/user/user.module"
import { TokenService } from "./token.service"
import { AuthConfigService } from "./auth.config"
import { CookieService } from "./cookie.service"
import { AuthGuard } from "./guards/auth.guard"

@Module({
   controllers: [AuthController],
   providers: [
      AuthService,
      PasswordService,
      UserService,
      TokenService,
      AuthConfigService,
      CookieService,
      AuthGuard,
   ],
   imports: [forwardRef(() => UserModule)],
   exports: [AuthGuard, TokenService],
})
export class AuthModule {}
