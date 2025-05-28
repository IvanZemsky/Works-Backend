import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from 'cookie-parser'; // Correct import

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   app.use(cookieParser())
   app.useGlobalPipes(new ValidationPipe())

   await app.listen(process.env.APP_PORT ?? 3000)
}

void bootstrap()
