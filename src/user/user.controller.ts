import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { UpdateUserNameDTO } from "./user.dto"

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

   @Put(":id/name")
   @UseGuards(AuthGuard)
   async updateUser(@Param("id") id: string, @Body() dto: UpdateUserNameDTO) {
      return this.userService.updateName(id, dto)
   }
}
