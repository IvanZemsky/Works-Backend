import { forwardRef, Module } from "@nestjs/common"
import { VacancyController } from "./vacancy.controller"
import { VacancyService } from "./vacancy.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Vacancy } from "./vacancy.model"
import { AuthModule } from "src/auth/auth.module"
import { EmployerModule } from "src/employer/employer.module"
import { UserModule } from "src/user/user.module"

@Module({
   imports: [
      TypeOrmModule.forFeature([Vacancy]),
      forwardRef(() => AuthModule),
      EmployerModule,
      UserModule,
   ],
   controllers: [VacancyController],
   providers: [VacancyService],
})
export class VacancyModule {}
