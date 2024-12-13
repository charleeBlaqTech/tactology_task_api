import { Controller, Get, Post, Patch, 
    Delete, Options, All, Put, HttpCode, Req,
    Res, Body, UsePipes, ValidationPipe,UseGuards, Param, HttpStatus, HttpException, ParseIntPipe} from "@nestjs/common";
import { Request, Response} from "express";
import { createDepartmentDto, createDepartmentSchema, updateDataDto} from './dto/departments.dto';
import { DepartmentsService } from "./departments.service";
import { ZodValidationPipe } from "src/common/pipes/validation.pipe";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


// @Controller({ host: ':account.example.com' })
@Controller('departments')
export class DepartmentsController{

    constructor(private departmentService: DepartmentsService){}
    // I like being descriptive about the naming of my class methods for others to understand what each method is doing inside the class...

    @UseGuards(JwtAuthGuard)
    @Get('fetch_departments')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform: true }))
    async fetchDepartments():Promise<any[]>{
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

    @UseGuards(JwtAuthGuard)
    @Get('find_department:id')
    @HttpCode(200)
    async findDepartment(@Param('id', ParseIntPipe) id: number){
        return 
    }

    @UseGuards(JwtAuthGuard)
    @Post('create_department')
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createDepartmentSchema))
    createDepartment(@Req() request:Request, @Body() body:createDepartmentDto): String{
        console.log(request)
        return "This are all the departments"
    }

    @UseGuards(JwtAuthGuard)
    @Put('update_department:id')
    @HttpCode(200)
    updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() updateData: updateDataDto): String{
        return "This are all the departments"
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update_department_field:id')
    @HttpCode(200)
    patchDepartmentSchemaField(@Param('id', ParseIntPipe) id: number): String{
        return "This are all the departments"
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete_department:id')
    @HttpCode(200)
    destroyDepartment(@Res() res: Response, @Param('id', ParseIntPipe) id: number){
        res.status(200).json({message: "successfully"})
    }
}




// NINE TYPES OF PIPES IN NEST JS
// ValidationPipe
// ParseIntPipe
// ParseFloatPipe
// ParseBoolPipe
// ParseArrayPipe
// ParseUUIDPipe
// ParseEnumPipe
// DefaultValuePipe
// ParseFilePipe