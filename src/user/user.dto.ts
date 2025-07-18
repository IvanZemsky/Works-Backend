import { IsEnum, IsNotEmpty } from "class-validator"
import { User, UserRole } from "./user.model"

export type GetUserDTO = Omit<User, "passwordHash" | "salt">

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

export class UpdateUserNameDTO {
   @IsNotEmpty()
   firstName: string

   @IsNotEmpty()
   lastName: string

   patronymic: string | null
}
