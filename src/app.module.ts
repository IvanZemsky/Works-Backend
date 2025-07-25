import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { TypeOrmModuleConfig } from "./db/db.module"
import { ConfigModule } from "@nestjs/config"
import { ManagerModule } from "./manager/manager.module"
import { ApplicantModule } from "./applicant/applicant.module"
import { EmployerModule } from "./employer/employer.module"
import { AuthModule } from "./auth/auth.module"
import { JwtModule } from "@nestjs/jwt"
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      JwtModule.register({
         global: true,
      }),
      TypeOrmModuleConfig,
      UserModule,
      ManagerModule,
      ApplicantModule,
      EmployerModule,
      AuthModule,
      VacancyModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
