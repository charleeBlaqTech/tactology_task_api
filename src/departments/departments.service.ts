import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createDepartmentDto, updateDataDto} from './dto/departments.dto';
import { Department } from './departments.entity';
import { Sub_Departments } from './subdepartment.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departments: Repository<Department>,
    // private subDeparts: Repository<Sub_Departments>,
  ) {}

  async create(department: Department):Promise<Department | any>{
    const dept_name_exist = await this.findOneByName(department.name)
    if (dept_name_exist.name === department.name) {
      return { message: `Department with the name ${department.name} already exist` }
    }
    if (department.subDepartments.length > 0){
      // const result = department.subDepartments?.map((item: Sub_Departments)=>(
      //   this.sub_departments.save(item)
      // ))
      // const createdSubDepartments = await Promise.all(result)
      // department.subDepartments = createdSubDepartments
      // return this.departments.save(department)
      return
    }else{
      // department.subDepartments = []
      return this.departments.save(department)
    }
  
  }

  async findAll():Promise<Department[]>{
    return this.departments.find()
  }

  async findOne(id: number):Promise<Department> {
    return this.departments.findOneBy({id:id})
  }

  async findOneByName(name: string):Promise<Department> {
    return this.departments.findOneBy({name:name})
  }

  // TO UPDATE A DEPARTMENT
  async update(id: number, body: Department):Promise<Department> {
    await this.departments.update({id:id}, body)
    return 
  }

  // TO UPDATE JUST A SINGLE FIELD OF THE DEPARTMENT INSTANCE 
  async patch(id: number, sub_dep_id: number, name : string):Promise<Department> {
    const result = await this.departments.findOneBy({id:id})
    let sub_depts = result.subDepartments.map((item, index)=>{
      return item
    })
    const foundSubDepartment = sub_depts.find((item)=>{
      return item?.id === sub_dep_id
    })
    foundSubDepartment.name = name
    return result
  }

  async remove(id: number){
    return this.departments.delete({id: id})
  }
}