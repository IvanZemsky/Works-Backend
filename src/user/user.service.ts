import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import { User } from "./user.model"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUserDTO, UpdateUserNameDTO } from "./user.dto"

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

   async findAll() {
      return await this.userRepository.find()
   }

   async findOneById(id: string) {
      const user = await this.userRepository.findOne({ where: { id } })

      if (!user) {
         throw new NotFoundException()
      }

      return user
   }

   async create(user: CreateUserDTO) {
      return await this.userRepository.save(user)
   }

   async updateName(userId: string, dto: UpdateUserNameDTO) {
      const user = await this.findOneById(userId)
      
      user.firstName = dto.firstName
      user.lastName = dto.lastName
      user.patronymic = dto.patronymic

      return await this.userRepository.save(user)
   }

   async removeRefreshToken(userId: string) {
      return await this.userRepository.update(userId, { refreshToken: null })
   }

   async storeRefreshToken(userId: string, refreshToken: string) {
      return await this.userRepository.update(userId, { refreshToken })
   }
}
