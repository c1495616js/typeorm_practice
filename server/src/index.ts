import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { Category } from "./entity/Category";
import { Question } from "./entity/Question";
import { Profile } from "./entity/Profile";

createConnection()
  .then(async (connection) => {
    await connection
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .where("1=1");

    await connection.getRepository(Profile).createQueryBuilder().delete();

    let user = new User();
    user.name = "Jerry";

    let profile = new Profile();
    profile.gender = "male";
    profile.photo = "photo";
    // profile.user = user;
    await connection.manager.getRepository(Profile).save(profile);
    user.profile = profile;

    await connection.manager.getRepository(User).save(user);

    const users = await connection.manager
      .getRepository(User)
      .find({ relations: ["profile"] });
    console.log(users);
  })
  .catch((error) => console.log(error));
