import { Controller, Get, Post, Patch, 
    Delete, Options, All, Put, HttpCode, Req,
    Res, Body, UsePipes, ValidationPipe,UseGuards, Param, HttpStatus, HttpException, ParseIntPipe} from "@nestjs/common";
import { Request, Response} from "express";
import { createDepartmentDto, createDepartmentSchema, updateDataDto} from './dto/departments.dto';
import { DepartmentsService } from "./departments.service";
import { ZodValidationPipe } from "src/common/pipes/validation.pipe";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Department } from "./departments.entity";
import { Sub_Departments } from "./subdepartment.entity";


@Controller('api/v1/departments')
export class DepartmentsController{

    constructor(private departmentService: DepartmentsService){}
    // I like being descriptive about the naming of my class methods for others to understand what each method is doing inside the class...

    // @UseGuards(JwtAuthGuard)
    @Get('fetch_departments')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform: true }))
    async fetchDepartments():Promise<Department[]>{
        try {
            return this.departmentService.findAll()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to fetch all departments from the database',
              }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id/find_department')
    @HttpCode(200)
    async findDepartment(@Param('id', ParseIntPipe) id: number){
        return 
    }

    // @UseGuards(JwtAuthGuard)
    @Post('create_department')
    @HttpCode(201)
    // @UsePipes(new ZodValidationPipe(createDepartmentSchema))
    async createDepartment(@Req() request:Request, @Body() body:Department): Promise<Department>{
        return this.departmentService.create(body)
    }

    // @UseGuards(JwtAuthGuard)
    @Put(':id/update_department')
    @HttpCode(200)
    async updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() body: Department):Promise<Department>{
        return this.departmentService.update(id= id, body= body)
    }

    // @UseGuards(JwtAuthGuard)
    @Patch(':id/update_department_field')
    @HttpCode(200)
    async patchDepartmentSchemaField(@Param('id', ParseIntPipe) id: number):Promise<Department>{
        return
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id/delete_department')
    @HttpCode(200)
    async destroyDepartment(@Res() res: Response, @Param('id', ParseIntPipe) id: number){
        await this.departmentService.remove(id)
        res.status(200).json({message: "Deapartment deleted successfully"})
    }
}
