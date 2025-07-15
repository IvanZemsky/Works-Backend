import { Body, Controller, Post } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { Employer } from "./emloyer.model";
import { CreateEmployerDto } from "./types/dto";

@Controller('employers')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  async create(@Body() createEmployerDto: CreateEmployerDto): Promise<Employer> {
    return await this.employerService.create(createEmployerDto);
  }
}
