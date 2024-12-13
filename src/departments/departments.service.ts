import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Controller, Get, Post, Patch, 
  Delete, Options, All, Put, HttpCode, Req,
  Res, Body, UsePipes, ValidationPipe, Param, HttpStatus} from "@nestjs/common";
import { Request, Response} from "express";
import { createDepartmentDto, updateDataDto} from './dto/departments.dto';
// // import { DepartmentEntity } from './department.entity';
// // import { SubDepartmentEntity } from './subdepartment.entity';
// import { CreateDepartmentDto } from '../common/dto/create-department.dto';
// import { CreateSubDepartmentDto } from '../common/dto/create-subdepartment.dto';
import { Department } from './interfaces/departments.interface';

@Injectable()
export class DepartmentsService {
  constructor() {}

  create(department: Department) {
    return 'This action adds a new cat';
  }

  findAll():Department[]{
    return [{name: "Finance", subDepartments:[{name: "account"}]}]
  }

  findOne() {
    return `This action returns acat`;
  }

  update() {
    return `This action updates a  cat`;
  }

  patch() {
    return `This action updates a  cat`;
  }

  remove() {
    return `This action removes cat`;
  }
}