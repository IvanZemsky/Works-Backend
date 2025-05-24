import { parseConfig } from "src/shared/lib/utils/config"
import z from "zod"

const pgConfigSchema = z.object({
   DB_HOST: z.string(),
   DB_PORT: z.coerce.number(),
   DB_USERNAME: z.string(),
   DB_PASSWORD: z.string(),
   DB_NAME: z.string(),
})

type PostgresConfig = {
   host: string
   port: number
   username: string
   password: string
   database: string
}

export function parsePgConfig(env: Record<string, string | undefined>): PostgresConfig {
   const envConfig = parseConfig(pgConfigSchema, env)

   return {
      host: envConfig.DB_HOST,
      port: envConfig.DB_PORT,
      username: envConfig.DB_USERNAME,
      password: envConfig.DB_PASSWORD,
      database: envConfig.DB_NAME,
   }
}