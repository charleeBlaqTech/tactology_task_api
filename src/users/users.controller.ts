import { Injectable } from '@nestjs/common';
import { Controller, Get, Post, Patch, 
  Delete, Options, All, Put, HttpCode, Req,
  Res, Body, UsePipes, ValidationPipe,UseGuards, Param, HttpStatus, HttpException, ParseIntPipe} from "@nestjs/common";
import { UsersService } from './users.service';
import { User } from './users.entity';


@Controller('api/v1/users')
export class UsersController {
  constructor(private userServices: UsersService){}

  // I like being descriptive about the naming of my class methods for others to understand what each method is doing inside the class..
  @Post('create_user')
  @HttpCode(201)
  async createUser(@Body() data: User){
    try {
      return await this.userServices.create(data)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: `${data?.firstName} the server Failed to create your user account `,
      }, HttpStatus.FORBIDDEN, {
        cause: error
    });
    }
  }
  
  @Get('fetch_users')
  @HttpCode(200)
  async fetchAll(){
    try {
      return await this.userServices.find()
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: `server Failed to fetch users data from the database`,
      }, HttpStatus.FORBIDDEN, {
        cause: error
    });
  }
}

  @Get(':id/find_user')
  @HttpCode(200)
  async findUser(@Param('id', ParseIntPipe) id: number){
    try {
      return await this.userServices.findOneById(id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'User not found',
      }, HttpStatus.FORBIDDEN, {
        cause: error
    });
    }
  }

  @Get(':id/profile')
  @HttpCode(200)
  async userProfile(@Param('id', ParseIntPipe) id: number){
    try {
      return await this.userServices.userProfile(id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'User profile not found',
      }, HttpStatus.FORBIDDEN, {
        cause: error
    });
    }
  }

}