import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Sub_Departments} from './subdepartment.entity';
// import { defaultIfEmpty } from 'rxjs';
// import {EntitySchema} from "typeorm";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  // One department can have many subdepartments
  @OneToMany(() => Sub_Departments, sub_department => sub_department.department)
  subDepartments: Sub_Departments[];
}
