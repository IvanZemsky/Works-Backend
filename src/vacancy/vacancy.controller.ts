import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   Post,
   Put,
   Query,
   Res,
   UseGuards,
} from "@nestjs/common"
import { VacancyService } from "./vacancy.service"
import { Vacancy, VacancyEducation, VacancyExperience } from "./vacancy.model"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { UpdateVacancyDto, CreateVacancyDto } from "./dto/dto"
import { FindVacanciesFilters } from "./dto/filters"
import { Response } from "express"
import { VACANCY_DEFAULT_LIMIT } from "./const"

@Controller("vacancies")
export class VacancyController {
   constructor(private readonly vacancyService: VacancyService) {}

   @Post()
   @HttpCode(HttpStatus.CREATED)
   async create(@Body() createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
      return this.vacancyService.create(createVacancyDto)
   }

   @Get()
   @HttpCode(HttpStatus.OK)
   async find(
      @Res({ passthrough: true }) res: Response,
      @Query("limit") limit: number = VACANCY_DEFAULT_LIMIT,
      @Query("page") page: number = 1,
      @Query("text_search") textSearch: string = "",
      @Query("salary_from") salaryFrom: number | null = null,
      @Query("experience") experience?: VacancyExperience,
      @Query("education") education?: string,
      @Query("is_income") isIncome?,
   ): Promise<Vacancy[]> {
      const filters: FindVacanciesFilters = {
         textSearch,
         salaryFrom,
         experience,
         education,
         isIncome
      }
      const offset = limit * page - limit
      const { vacancies, count } = await this.vacancyService.findAll(
         limit,
         offset,
         filters,
      )

      res.set("X-Total-Count", String(count))
      return vacancies
   }

   @Get(":id")
   @HttpCode(HttpStatus.OK)
   async findOne(@Param("id") id: string): Promise<Vacancy> {
      return this.vacancyService.findOne(id)
   }

   @Put(":id")
   @UseGuards(AuthGuard)
   @HttpCode(HttpStatus.OK)
   async update(
      @Param("id") id: string,
      @Body() updateVacancyDto: UpdateVacancyDto,
   ): Promise<Vacancy> {
      return this.vacancyService.update(id, updateVacancyDto)
   }

   @Delete(":id")
   @UseGuards(AuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   async remove(@Param("id") id: string): Promise<void> {
      await this.vacancyService.remove(id)
   }

   @Get("search")
   @HttpCode(HttpStatus.OK)
   async search(@Query() query: any): Promise<Vacancy[]> {
      return this.vacancyService.search(query)
   }
}
