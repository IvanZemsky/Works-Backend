import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthConfigService } from "./auth.config"
import { JWT_TYPES } from "./auth.constants"
import { TokenData, TokensDTO } from "./auth.dto"

@Injectable()
export class TokenService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly authConfigService: AuthConfigService,
   ) {}

   async generateJWTTokens(userId: string, role: string): Promise<TokensDTO> {
      const accessToken = await this.generateAccessToken(userId, role)
      const refreshToken = await this.generateRefreshToken(userId, role)

      return { accessToken, refreshToken }
   }

   async generateAccessToken(userId: string, role: string) {
      const payload: TokenData = { sub: userId, role, type: JWT_TYPES.ACCESS_TOKEN }
      const secret = this.authConfigService.config.jwtAccessSecret
      const expiresIn = this.authConfigService.config.jwtAccessExpiresIn

      const token = await this.jwtService.signAsync(payload, { secret, expiresIn })
      return token
   }

   async generateRefreshToken(userId: string, role: string): Promise<string> {
      const payload: TokenData = {
         sub: userId,
         role,
         type: JWT_TYPES.REFRESH_TOKEN,
      }
      const secret = this.authConfigService.config.jwtRefreshSecret
      const expiresIn = this.authConfigService.config.jwtRefreshExpiresIn

      const refreshToken = this.jwtService.signAsync(payload, {
         secret: secret,
         expiresIn: expiresIn,
      })

      return refreshToken
   }

   async validateAccessToken(token: string) {
      const secret = this.authConfigService.config.jwtAccessSecret
      try {
         const decoded = await this.jwtService.verifyAsync<TokenData>(token, {
            secret,
         })
         return decoded
      } catch (error) {
         return null
      }
   }

   async validateRefreshToken(token: string) {
      const secret = this.authConfigService.config.jwtRefreshSecret
      try {
         const decoded = await this.jwtService.verifyAsync<TokenData>(token, {
            secret,
         })

         return decoded
      } catch (error) {
         return null
      }
   }

   decode(token: string): TokenData | null {
      return this.jwtService.decode(token) as TokenData | null
   }
}
