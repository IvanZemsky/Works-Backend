import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { PasswordService } from "./password.service"
import { SignInDTO, SignUpDTO, TokensDTO } from "./auth.dto"
import { TokenService } from "./token.service"

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private passwordService: PasswordService,
      private tokenService: TokenService,
   ) {}

   async registerUser(dto: SignUpDTO): Promise<string> {
      const salt = this.passwordService.getSalt()
      const passwordHash = this.passwordService.hashPassword(dto.password, salt)

      const user = await this.userService.create({
         ...dto,
         passwordHash,
         salt,
      })

      const tokens = await this.tokenService.generateJWTTokens(user.id, user.role)

      await this.userService.storeRefreshToken(user.id, tokens.refreshToken)

      return tokens.accessToken
   }

   async login(dto: SignInDTO): Promise<string> {
      const user = await this.userService.findOneByLogin(dto.login)

      const providedPasswordHash = this.passwordService.hashPassword(
         dto.password,
         user.salt,
      )

      if (user.passwordHash !== providedPasswordHash) {
         throw new UnauthorizedException()
      }

      const tokens = await this.tokenService.generateJWTTokens(user.id, user.role)

      await this.userService.storeRefreshToken(user.id, tokens.refreshToken)

      return tokens.accessToken
   }

   async logout(userId: string) {
      await this.userService.removeRefreshToken(userId)
   }

   async refresh(refreshToken: string | null) {
      if (!refreshToken) {
         throw new UnauthorizedException()
      }

      const userData = await this.tokenService.validateRefreshToken(refreshToken)
      if (!userData) {
         throw new UnauthorizedException()
      }

      const user = await this.userService.findOneById(userData.sub)
      if (!user.refreshToken) {
         throw new UnauthorizedException()
      }

      const tokens = await this.tokenService.generateJWTTokens(
         user.id,
         user.role,
      )

      await this.userService.storeRefreshToken(user.id, tokens.refreshToken)
      return {...tokens, user}
   }
}
