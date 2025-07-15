import { IsString, IsNotEmpty, IsOptional, IsNumber, Max, Min } from "class-validator"

export class CreateEmployerDto {
   @IsNotEmpty()
   @IsString()
   userId: string

   @IsNotEmpty()
   @IsString()
   name: string

   @IsNotEmpty()
   @IsString()
   description: string

   @IsNotEmpty()
   @IsString()
   type: string

   @IsNotEmpty()
   @IsNumber()
   @Min(0)
   @Max(5)
   rating: number

   @IsOptional()
   @IsString()
   website?: string

   @IsOptional()
   @IsString()
   logo?: string

   @IsOptional()
   @IsString()
   location?: string
}

export class UpdateEmployerDto {
   @IsOptional()
   @IsString()
   userId?: string

   @IsOptional()
   @IsString()
   name?: string

   @IsOptional()
   @IsString()
   description?: string

   @IsOptional()
   @IsString()
   type?: string

   @IsOptional()
   @IsNumber()
   @Min(0)
   @Max(5)
   rating?: number

   @IsOptional()
   @IsString()
   website?: string

   @IsOptional()
   @IsString()
   logo?: string

   @IsOptional()
   @IsString()
   location?: string
}
