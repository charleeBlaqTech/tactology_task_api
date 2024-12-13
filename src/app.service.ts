import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ) {}

  welcome() {
    return {
        welcome: "You are welcome to TECTOLOGY DEPARTMENTS SORTING APPLICATION..",
        developer: "CHARLES ARUNEGBODE DAUDU",
        TECH_STACK: "NEST JS, TypeORM, postgreSQL, JWT, BCRYPT, GraphQL, CLASS-VALIDATOR, NEXT JS, RENDER.COM, VARCEL",
        start_date: "10-12-2024",
        due_date: "13-12-2024",
        client: "TECTOLOGY GLOBAL LIMITED",
    }
  }
}