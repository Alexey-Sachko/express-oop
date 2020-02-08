import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  getRepository
} from "typeorm";
import bcrypt from "bcrypt";
import uuid from "uuid/v1";

export type UserRO = {
  id: number;
  email: string;
  username: string;
  password?: string;
};

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, nullable: true, select: false })
  password: string = "";

  @Column({ length: 500 })
  email: string;

  @Column({ length: 100, default: null, nullable: true })
  confirmUid?: string;

  @Column({ type: "boolean", default: false })
  isConfirmed: boolean = false;

  constructor(username: string, email: string, password: string) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @BeforeInsert()
  generatConfirm() {
    this.confirmUid = uuid();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(): UserRO {
    const { id, email, username } = this;
    const responseObject: UserRO = {
      id,
      username,
      email
    };

    return responseObject;
  }
}

export const getUsersRepository = () => getRepository(User);
