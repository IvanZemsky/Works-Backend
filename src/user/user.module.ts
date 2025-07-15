import { forwardRef, Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { User } from "./user.model"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CookieService } from "src/auth/cookie.service"
import { AuthModule } from "src/auth/auth.module"

@Module({
   imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
   controllers: [UserController],
   providers: [UserService, CookieService],
   exports: [TypeOrmModule],

})
export class UserModule {}
