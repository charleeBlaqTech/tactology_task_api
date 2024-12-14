import { Injectable } from '@nestjs/common';
import {
  Controller, Get, Post, Patch,
  Delete, Options, All, Put, HttpCode, Req,
  Res, Body, UsePipes, ValidationPipe, UseGuards, Param, HttpStatus, HttpException, ParseIntPipe
} from "@nestjs/common";
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserType } from './user.type';


@Controller('api/v1/users')
export class UsersController {
  constructor(private userServices: UsersService) { }

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() data: UserType) {
    return await this.userServices.create(data)
  }

  @Get('find')
  @HttpCode(200)
  async fetchAll() {
    return await this.userServices.find()
  }

  @Get(':username/findOne')
  @HttpCode(200)
  async findUser(@Param('username') username: string) {
    return await this.userServices.findUser(username)
  }
}