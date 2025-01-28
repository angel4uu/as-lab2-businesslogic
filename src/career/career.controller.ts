import { Controller,Get, Query} from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private CareerService: CareerService) {}

  @Get()
  async getAllCareers() {
    return this.CareerService.getAllCareers();
  }

}