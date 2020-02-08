import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  ManyToOne
} from "typeorm";
import uuid from "uuid/v1";
import { User } from "./user";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(
    type => User,
    user => user.id,
    { onDelete: "CASCADE" }
  )
  userId: number;

  @Column()
  refreshToken: string = "";

  @Column()
  expiresIn: number = 0;

  constructor(userId: number) {
    super();
    this.userId = userId;
  }

  @BeforeInsert()
  makeRefreshToken() {
    this.refreshToken = uuid();
    this.expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours
  }
}
