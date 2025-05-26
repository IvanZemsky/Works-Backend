import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { TypeOrmModuleConfig } from "./db/db.module"
import { ConfigModule } from "@nestjs/config"
import { ManagerModule } from "./manager/manager.module"
import { ApplicantModule } from "./applicant/applicant.module"
import { EmployerModule } from "./employer/employer.module"
import { AuthModule } from './auth/auth.module';

@Module({
   imports: [
      ConfigModule.forRoot(),
      TypeOrmModuleConfig,
      UserModule,
      ManagerModule,
      ApplicantModule,
      EmployerModule,
      AuthModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
