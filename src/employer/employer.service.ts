import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Employer } from "./emloyer.model"
import { CreateEmployerDto } from "./types/dto"
import { User } from "src/user/user.model"

@Injectable()
export class EmployerService {
   constructor(
      @InjectRepository(Employer)
      private readonly employerRepository: Repository<Employer>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
   ) {}

   async create(createEmployerDto: CreateEmployerDto): Promise<Employer> {
      const { userId, ...employerData } = createEmployerDto

      // 1. Найдите пользователя по ID
      const user = await this.userRepository.findOne({ where: { id: userId } })
      console.log(userId)

      if (!user) {
         throw new NotFoundException(`User with ID "${userId}" not found`)
      }

      // 2. Создайте Employer, связав его с User
      const employer = this.employerRepository.create({
         ...employerData,
         user: user, // Свяжите пользователя с работодателем
      })

      // 3. Сохраните Employer
      return this.employerRepository.save(employer)
   }
}
