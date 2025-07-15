import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { AuthGuard } from "src/auth/guards/auth.guard"

@Controller("users")
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get()
   async getUsers() {
      return this.userService.findAll()
   }

   @Get(":id")
   async getUserById(@Param("id") id: string) {
      return this.userService.findOneById(id)
   }
}
