import z from "zod"

export function parseConfig<T extends z.ZodSchema<unknown>>(
   configSchema: T,
   data: unknown
): z.infer<T> {
   const parsed = configSchema.safeParse(data)

   if (!parsed.success) {
      throw new Error(`Invalid environment variables: ${parsed.error.message}`)
   }

   return parsed.data as z.infer<T>
}
