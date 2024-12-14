import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department, Sub_Departments } from 'src/grapsql/schemas/departments.entity';


@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Sub_Departments)
    private subDepartmentRepository: Repository<Sub_Departments>
  ) { }

  async createDepartment(name: string, subDepartments: { name: string }[] = []): Promise<Department> {
   try {
    const department = this.departmentRepository.create({ name, subDepartments, });
    return await this.departmentRepository.save(department)
   } catch (error) {
    if(error.code === '23505'){
      throw new ConflictException(`Department with ${name} already exist.`)
    }
    throw error
   }
  }

  async findAllDepartments(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find()
    } catch (error) {
      throw error
    }
  }

  //Update dept
  async updateDepartmentName(departmentId: number, name: string): Promise<Department> { 
    const department = await this.departmentRepository.findOne({ where: { id: departmentId } }); 
    if (!department) { 
      throw new Error(`Department with ID ${departmentId} not found.`);
    } 
    department.name = name; 
    return await this.departmentRepository.save(department); 
  }


  //Update sub dept
  async updateSubDepartmentName(subDepartmentId: number, name: string,): Promise<Sub_Departments> {
    const subDepartment = await this.subDepartmentRepository.findOne({ where: { id: subDepartmentId }}); 
    if (!subDepartment) { 
      throw new Error(`SubDepartment with ID ${subDepartmentId} not found.`); 
    } 
    subDepartment.name = name; 
    return await this.subDepartmentRepository.save(subDepartment); 
  }

  //Delete dept
  async deleteDepartment(departmentId: number): Promise<Department | any>{ 
    const result = await this.departmentRepository.delete(departmentId); 
    return await result.affected > 0; 
  }

  // Delete sub
  async deleteSubDepartment(subDepartmentId: number): Promise<Sub_Departments | any>{ 
    const result = await this.subDepartmentRepository.delete(subDepartmentId); 
    return result.affected > 0;
  }

}