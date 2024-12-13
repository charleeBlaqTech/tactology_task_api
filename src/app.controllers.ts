import { Controller, Get, Post, Patch, 
    Delete, Options, All, Put, HttpCode, Req,
    Res, Body, UsePipes, ValidationPipe,UseGuards, Param, HttpStatus, HttpException, ParseIntPipe} from "@nestjs/common";
import { AppService } from "./app.service";


// @Controller({ host: ':account.example.com' })
@Controller('api/v1')
export class AppController{

    constructor(private appService: AppService){}
    // I like being descriptive about the naming of my class methods for others to understand what each method is doing inside the class...

    @Get('welcome_note')
    @HttpCode(200)
    async welcome_home(){
        try {
            return this.appService.welcome()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to fetch all departments from the database',
              }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}