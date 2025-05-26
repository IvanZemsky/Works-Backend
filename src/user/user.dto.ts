import { IsEnum, IsNotEmpty } from "class-validator"
import { UserRole } from "./user.model"

export class CreateUserDTO {
   @IsNotEmpty()
   login: string

   @IsNotEmpty()
   passwordHash: string

   @IsNotEmpty()
   salt: string

   @IsEnum({ values: ["applicant", "manager", "employer"] })
   role: UserRole
}
