import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { CareerModule } from './career/career.module';

@Module({
  imports: [StudentModule,CareerModule],
})
export class AppModule {}
