import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { PasswordService } from "./password.service"
import { UserService } from "src/user/user.service"
import { UserModule } from "src/user/user.module"

@Module({
   controllers: [AuthController],
   providers: [AuthService, PasswordService, UserService],
   imports: [UserModule],
})
export class AuthModule {}
