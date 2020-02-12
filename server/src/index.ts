import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { Category } from "./entity/Category";
import { Question } from "./entity/Question";

createConnection()
  .then(async connection => {})
  .catch(error => console.log(error));
