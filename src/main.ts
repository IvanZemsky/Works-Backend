import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   app.enableCors({
      origin: "http://localhost:3000",
      credentials: true,
   })
   app.use(cookieParser())
   app.useGlobalPipes(new ValidationPipe())

   await app.listen(process.env.APP_PORT ?? 3000)
}

void bootstrap()
