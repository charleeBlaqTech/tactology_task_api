import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Department } from './departments.entity';
import { Sub_Departments } from './subdepartment.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentsController],
  // exports: [DepartmentsController]
})
export class DepartmentsModule {}
