import {
   IsString,
   IsNotEmpty,
   IsOptional,
   IsNumber,
   IsEnum,
   ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"
import { VacancySalaryPeriod, VacancyExperienceType, VacancyStatus, VacancyLocation } from "../vacancy.model"

class VacancyAddressDto {
   @IsOptional()
   @IsString()
   street?: string

   @IsOptional()
   @IsString()
   city?: string

   @IsOptional()
   @IsString()
   country?: string

   @IsOptional()
   @IsString()
   building?: string
}

class VacancySalaryDto {
   @IsOptional()
   @IsNumber()
   min?: number

   @IsOptional()
   @IsNumber()
   max?: number

   @IsNotEmpty()
   @IsEnum(VacancySalaryPeriod)
   period: VacancySalaryPeriod
}

class VacancyContactsDto {
   @IsOptional()
   @IsString()
   email?: string

   @IsOptional()
   @IsString()
   phone?: string

   @IsOptional()
   @IsString()
   name?: string
}

class VacancyExperienceDto {
   @IsOptional()
   @IsNumber()
   min?: number

   @IsOptional()
   @IsNumber()
   max?: number

   @IsOptional()
   @IsEnum(VacancyExperienceType)
   type?: VacancyExperienceType
}

export class CreateVacancyDto {
   @IsNotEmpty()
   @IsString()
   employerId: string //  Change this to string

   @IsNotEmpty()
   @IsString()
   userId: string // Change this to string

   @IsNotEmpty()
   @IsEnum(VacancyStatus)
   status: VacancyStatus

   @IsNotEmpty()
   @IsString()
   title: string

   @IsNotEmpty()
   @IsString()
   description: string

   @IsNotEmpty()
   @IsEnum(VacancyLocation)
   location: VacancyLocation

   @IsNotEmpty()
   date: Date

   @IsOptional()
   @IsString()
    schedule: string | null

   @IsNotEmpty()
   @IsNumber()
   hoursPerDay: number

   @IsNotEmpty()
   @ValidateNested()
   @Type(() => VacancyAddressDto)
   address: VacancyAddressDto

   @IsNotEmpty()
   @ValidateNested()
   @Type(() => VacancySalaryDto)
   salary: VacancySalaryDto

   @IsOptional()
   @IsString()
   skills?: string

   @IsNotEmpty()
   @ValidateNested()
   @Type(() => VacancyExperienceDto)
   experience: VacancyExperienceDto

   @IsNotEmpty()
   @ValidateNested()
   @Type(() => VacancyContactsDto)
   contacts: VacancyContactsDto
}

export class UpdateVacancyDto {
   @IsOptional()
   @IsString()
   employerId?: string // Change this to string

   @IsOptional()
   @IsString()
   userId?: string // Change this to string

   @IsOptional()
   @IsEnum(VacancyStatus)
   status?: VacancyStatus

   @IsOptional()
   @IsString()
   title?: string

   @IsOptional()
   @IsString()
   description?: string

   @IsOptional()
   @IsEnum(VacancyLocation)
   location?: VacancyLocation

   @IsOptional()
   date?: Date

   @IsOptional()
   @IsString()
   schedule: string | null

   @IsOptional()
   @IsNumber()
   hoursPerDay?: number

   @IsOptional()
   @ValidateNested()
   @Type(() => VacancyAddressDto)
   address?: VacancyAddressDto

   @IsOptional()
   @ValidateNested()
   @Type(() => VacancySalaryDto)
   salary?: VacancySalaryDto

   @IsOptional()
   @IsString()
   skills?: string

   @IsOptional()
   @ValidateNested()
   @Type(() => VacancyExperienceDto)
   experience?: VacancyExperienceDto

   @IsOptional()
   @ValidateNested()
   @Type(() => VacancyContactsDto)
   contacts?: VacancyContactsDto
}
