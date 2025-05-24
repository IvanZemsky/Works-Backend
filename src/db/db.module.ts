import { Module } from '@nestjs/common';
import { parsePgConfig } from "./db.config";
import { User } from "src/user/user.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Applicant } from "src/applicant/applicant.model";
import { Employer } from "src/employer/emloyer.model";
import { Manager } from "src/manager/manager.model";

const config = parsePgConfig(process.env)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config,
      entities: [User, Employer, Manager, Applicant],
      synchronize: true, // ОСТОРОЖНО: в production использовать миграции!
    }),
  ],
})
export class TypeOrmModuleConfig {}