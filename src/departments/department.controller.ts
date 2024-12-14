
import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { Department , Sub_Departments} from "src/grapsql/schemas/departments.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller("api/v1/departments")
@UseGuards(JwtAuthGuard)
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentsService) { }

    @Post('create')
    async createDepartment(@Body() createDto: { name: string; subDepartments?: { name: string }[] },): Promise<Department> {
        const { name, subDepartments = [] } = createDto;
        return await this.departmentService.createDepartment(name, subDepartments);
    }
    @Get('find')
    async findAllDepartments(): Promise<Department[]> {
        return await this.departmentService.findAllDepartments()
    }
    @Patch(":id/update") async updateDepartmentName(@Param("id", ParseIntPipe) id: number, @Body() updateDto: { name: string },):Promise<Department>{
     const { name } = updateDto; 
     return await this.departmentService.updateDepartmentName(id, name); 
    }


    @Patch("sub/:id/update") async updateSubDepartmentName(@Param("id") id: number, @Body() updateDto: { name: string },):Promise<Sub_Departments>{
         const { name } = updateDto; 
         return await this.departmentService.updateSubDepartmentName(id, name); 
    }


    @Delete(":id/delete") async deleteDepartment(@Param("id") id: number):Promise<Department | any>{
         return await this.departmentService.deleteDepartment(id); 
    }


    @Delete("sub/:id/delete") async deleteSubDepartment(@Param("id") id: number): Promise<Sub_Departments | any>{
        return await this.departmentService.deleteSubDepartment(id); 
    }
}