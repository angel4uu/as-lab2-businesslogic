import { Controller,Get, Query} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('count-by-career')
  async getCountByCareer() {
    return this.studentService.getCountByCareer();
  }

  @Get('main-query')
  async getFilteredStudents(@Query('careerCode') careerCode: string) {
    return this.studentService.getMainQuery(careerCode);
  }

}