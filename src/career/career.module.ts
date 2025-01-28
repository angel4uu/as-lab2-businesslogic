import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';

@Module({
  imports: [HttpModule],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}
