import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import { User } from "./user.model"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUserDTO } from "./user.dto"

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
   ) {}

   async findOneByLogin(login: string) {
      const user = await this.userRepository.findOne({ where: { login } })

      if (!user) {
         throw new NotFoundException()
      }

      return user
   }

   async create(user: CreateUserDTO) {
      return await this.userRepository.save(user)
   }

   async storeRefreshToken(userId: string, refreshToken: string) {
      return await this.userRepository.update(userId, { refreshToken })
   }
}
