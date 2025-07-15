import { forwardRef, Module } from "@nestjs/common"
import { EmployerService } from "./employer.service"
import { EmployerController } from "./employer.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Employer } from "./emloyer.model"
import { UserModule } from "src/user/user.module"

@Module({
   imports: [TypeOrmModule.forFeature([Employer]), forwardRef(() => UserModule)],
   controllers: [EmployerController],
   providers: [EmployerService],
   exports: [TypeOrmModule],
})
export class EmployerModule {}
