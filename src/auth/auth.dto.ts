import { IsEnum, IsNotEmpty } from "class-validator"
import { UserRole } from "src/user/user.model"

export class SignUpDTO {
   @IsNotEmpty()
   login: string

   @IsNotEmpty()
   password: string

   @IsEnum(["applicant", "employer"])
   role: UserRole
}

export class SignInDTO {
   @IsNotEmpty()
   login: string

   @IsNotEmpty()
   password: string
}

export type TokensDTO = {
   accessToken: string
   refreshToken: string
}

export type TokenData = {
   sub: string
   role: string
   type: string
}
