import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { CreateUserDTO } from "src/user/user.dto"
import { UserService } from "src/user/user.service"
import { PasswordService } from "./password.service"
import { SignUpDTO } from "./auth.dto"

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private passwordService: PasswordService,
   ) {}

   async validateUser(login: string, password: string) {
      const user = await this.userService.findOneByLogin(login)
      if (!user) {
         throw new NotFoundException()
      }

      const passowrdHash = this.passwordService.hashPassword(password, user.salt)

      if (user.passwordHash !== passowrdHash) {
         throw new UnauthorizedException()
      }

      const { passwordHash, salt, ...result } = user
      return result
   }

   async registerUser(dto: SignUpDTO) {
      const salt = this.passwordService.getSalt()
      const passwordHash = this.passwordService.hashPassword(dto.password, salt)

      const user = await this.userService.create({
         ...dto,
         passwordHash,
         salt,
      })

      return user
   }
}
