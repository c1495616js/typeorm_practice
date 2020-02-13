import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(type => User, { eager: true })
  @JoinColumn()
  user: User;
}
