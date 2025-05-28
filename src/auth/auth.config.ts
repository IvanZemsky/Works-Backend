import { Injectable } from "@nestjs/common"
import { parseConfig } from "src/shared/lib/utils/config"
import { z } from "zod"

const authConfigSchema = z.object({
   JWT_ACCESS_SECRET: z.string(),
   JWT_REFRESH_SECRET: z.string(),
   JWT_ACCESS_EXPIRES_IN: z.string(),
   JWT_REFRESH_EXPIRES_IN: z.string(),
})

type AuthConfig = {
   jwtAccessSecret: string
   jwtRefreshSecret: string
   jwtAccessExpiresIn: string
   jwtRefreshExpiresIn: string
}

@Injectable()
export class AuthConfigService {
   readonly config: AuthConfig

   constructor() {
      let authConfig: AuthConfig

      try {
         authConfig = this.parseAuthConfig()
         this.config = authConfig
      } catch (error) {
         console.error("Error loading auth config:", error)
         throw new Error("Invalid auth configuration")
      }
   }

   private parseAuthConfig() {
      const parsed = parseConfig(authConfigSchema, process.env)

      return {
         jwtAccessSecret: parsed.JWT_ACCESS_SECRET,
         jwtRefreshSecret: parsed.JWT_REFRESH_SECRET,
         jwtAccessExpiresIn: parsed.JWT_ACCESS_EXPIRES_IN,
         jwtRefreshExpiresIn: parsed.JWT_REFRESH_EXPIRES_IN,
      }
   }
}
