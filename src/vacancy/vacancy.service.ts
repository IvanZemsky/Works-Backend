import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Like, FindOptionsWhere, Raw } from "typeorm"
import { UpdateVacancyDto, CreateVacancyDto } from "./dto/dto"
import { Vacancy } from "./vacancy.model"
import { Employer } from "src/employer/emloyer.model"
import { User } from "src/user/user.model"
import { FindVacanciesFilters } from "./dto/filters"

@Injectable()
export class VacancyService {
   constructor(
      @InjectRepository(Vacancy)
      private readonly vacancyRepository: Repository<Vacancy>,
      @InjectRepository(Employer)
      private readonly employerRepository: Repository<Employer>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
   ) {}

   async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
      const { employerId, userId, ...vacancyData } = createVacancyDto // Destructure

      const employer = await this.employerRepository.findOne({
         where: { id: employerId },
      })
      if (!employer) {
         throw new NotFoundException(`Employer with ID "${employerId}" not found`)
      }

      const user = await this.userRepository.findOne({ where: { id: userId } })
      if (!user) {
         throw new NotFoundException(`User with ID "${userId}" not found`)
      }

      const vacancy = this.vacancyRepository.create({
         ...vacancyData,
         employer: employer,
         user: user,
      })

      return this.vacancyRepository.save(vacancy)
   }

   async findAll(
      limit: number,
      offset: number = 0,
      filters: FindVacanciesFilters,
   ): Promise<{ vacancies: Vacancy[]; count: number }> {
      try {
         const where: FindOptionsWhere<Vacancy>[] = []

         if (filters.textSearch) {
            where.push({
               title: Raw((alias) => `${alias} ILIKE '%${filters.textSearch}%'`),
            })
            where.push({
               description: Raw((alias) => `${alias} ILIKE '%${filters.textSearch}%'`),
            })
            where.push({
               skills: Raw((alias) => `${alias} ILIKE '%${filters.textSearch}%'`),
            })
         }

         const [vacancies, count] = await this.vacancyRepository.findAndCount({
            take: limit,
            skip: offset,
            where,
            relations: ["employer"],
            select: {
               employer: {
                  id: true,
                  name: true,
                  rating: true,
               },
            },
         })

         return { vacancies, count }
      } catch (error) {
         throw new BadRequestException(`Failed to find all vacancies: ${error.message}`)
      }
   }

   async findOne(id: string): Promise<Vacancy> {
      try {
         const vacancy = await this.vacancyRepository.findOne({ where: { id } })
         if (!vacancy) {
            throw new NotFoundException(`Vacancy with ID "${id}" not found`)
         }
         return vacancy
      } catch (error) {
         if (error instanceof NotFoundException) {
            throw error
         }
         throw new BadRequestException(
            `Failed to find vacancy with ID "${id}": ${error.message}`,
         )
      }
   }

   async update(id: string, updateVacancyDto: UpdateVacancyDto): Promise<Vacancy> {
      try {
         const vacancy = await this.findOne(id)
         Object.assign(vacancy, updateVacancyDto)
         return this.vacancyRepository.save(vacancy)
      } catch (error) {
         if (error instanceof NotFoundException) {
            throw error
         }
         throw new BadRequestException(
            `Failed to update vacancy with ID "${id}": ${error.message}`,
         )
      }
   }

   async remove(id: string): Promise<void> {
      try {
         const vacancy = await this.findOne(id)
         await this.vacancyRepository.remove(vacancy)
      } catch (error) {
         if (error instanceof NotFoundException) {
            throw error
         }
         throw new BadRequestException(
            `Failed to remove vacancy with ID "${id}": ${error.message}`,
         )
      }
   }

   // нормально передавать параметры
   async search(query: any): Promise<Vacancy[]> {
      try {
         const { title, description, location, salaryMin, salaryMax, skills } = query
         const where: any = {}

         if (title) {
            where.title = Like(`%${title}%`)
         }
         if (description) {
            where.description = Like(`%${description}%`)
         }
         if (location) {
            where.location = location
         }
         if (salaryMin) {
            where.salaryMin = salaryMin
         }
         if (salaryMax) {
            where.salaryMax = salaryMax
         }
         // requirements убрал - сделать через skills
         // if (skills && Array.isArray(skills)) {
         //    where.requirements = { skills: Like(`%${skills.join("%")}%`) }
         // }

         return this.vacancyRepository.find({ where })
      } catch (error) {
         throw new BadRequestException(`Failed to search vacancies: ${error.message}`)
      }
   }
}
