import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Photo } from "./Photo";
import { Profile } from "./Profile";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_dt: Date;

  @OneToMany(
    type => Photo,
    photo => photo.user,
    { eager: true }
  )
  photos: Photo[];

  @OneToOne(type => Profile)
  @JoinColumn()
  profile: Profile;
}
