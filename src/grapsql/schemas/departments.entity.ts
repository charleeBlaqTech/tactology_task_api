import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, Unique } from 'typeorm';


@Entity()
@Unique(['name'])
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  // One department can have many subdepartments
  @OneToMany(() => Sub_Departments, sub_department => sub_department.department, {
    cascade: true,
    eager: true
  })
  subDepartments: Sub_Departments[];
}



@Entity()
export class Sub_Departments{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  // Many subdepartments belong to one department
  @ManyToOne(() => Department, department => department.subDepartments, { onDelete: 'CASCADE' , nullable: true })
  department: Department;
}
