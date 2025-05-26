import { forwardRef, Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { User } from "./user.model"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "src/auth/auth.module"

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   controllers: [UserController],
   providers: [UserService],
   exports: [TypeOrmModule], // Export TypeOrmModule to make UserRepository available
})
export class UserModule {}
