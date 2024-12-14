import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Department, Sub_Departments } from "../grapsql/schemas/departments.entity";
import { SubDepartmentInput, DepartmentType, SubDepartmentType } from "../grapsql/schemas/department.graph.type";
import { DepartmentsService } from "./departments.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Resolver()
@UseGuards(JwtAuthGuard)
export class DepartmentResolver {
    constructor(private readonly departmentService: DepartmentsService) { }

    @Mutation(() => DepartmentType)
    async createDepartment(@Arg("name") name: string, @Arg("subDepartments", () => [SubDepartmentInput], { nullable: true })
    subDepartments: SubDepartmentInput[] = []): Promise<Department> {
        return await this.departmentService.createDepartment(name, subDepartments)
    }


    @Query(() => [DepartmentType])
    async fetchDepartments(): Promise<Department[]> {
        return await this.departmentService.findAllDepartments()
    }

    //Dept

    @Mutation(() => DepartmentType) 
    async updateDepartmentName(@Arg("id") id: number, @Arg("name") name: string,): Promise<Department>{ 
        return await this.departmentService.updateDepartmentName(id, name); 
    }

    //Sub
    @Mutation(() => SubDepartmentType) 
    async updateSubDepartmentName(@Arg("id") id: number, @Arg("name") name: string,):Promise<Sub_Departments>{ 
        return await this.departmentService.updateSubDepartmentName(id, name); 
    }

    //Dep
    @Mutation(() => Boolean) async deleteDepartment(@Arg("id") id: number): Promise<Department>{ 
        return await this.departmentService.deleteDepartment(id);
    }

    //Sub
    @Mutation(() => Boolean) async deleteSubDepartment(@Arg("id") id: number):Promise<Sub_Departments>{
        return await this.departmentService.deleteSubDepartment(id); 
    }

}