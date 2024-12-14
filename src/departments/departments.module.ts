import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolver';
import { DepartmentController } from './department.controller';
import { DepartmentsService } from './departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Department, Sub_Departments } from 'src/grapsql/schemas/departments.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Department, Sub_Departments])],
  controllers: [DepartmentController],
  providers: [DepartmentsService, DepartmentResolver, DepartmentController],
})
export class DepartmentsModule {}
