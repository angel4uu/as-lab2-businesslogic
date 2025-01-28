import { Controller,Get, Query} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('count-by-career')
  async getCountByCareer() {
    return this.studentService.getCountByCareer();
  }

  @Get('main-query')
  async getMainQuery(@Query('careerCode') careerCode: number) {
    return this.studentService.getMainQuery(careerCode);
  }

}