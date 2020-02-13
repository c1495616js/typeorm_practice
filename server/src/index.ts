import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { Category } from "./entity/Category";
import { Question } from "./entity/Question";
import { Profile } from "./entity/Profile";

createConnection()
  .then(async connection => {
    try {
      console.log("hello world!");
    } catch (e) {
      console.error("error:", e);
    }
  })
  .catch(error => console.log(error));
