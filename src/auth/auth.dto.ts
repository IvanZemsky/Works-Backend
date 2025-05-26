import { IsEnum, IsNotEmpty } from "class-validator"
import { UserRole } from "src/user/user.model"

export class SignUpDTO {
   @IsNotEmpty()
   login: string

   @IsNotEmpty()
   password: string

   @IsEnum(["applicant", "manager", "employer"])
   role: UserRole
}
