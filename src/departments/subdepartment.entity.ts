import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './departments.entity';

@Entity()
export class Sub_Departments{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Many subdepartments belong to one department
  @ManyToOne(() => Department, department => department.subDepartments)
  department: Department;
}