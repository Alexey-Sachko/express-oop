import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ length: 50, unique: true })
  username: string;

  // @Column({ length: 100, nullable: true })
  // password: string | null = null;

  // @Column({ length: 100, nullable: true })
  // passwordHash: string | null = null;

  @Column({ length: 500 })
  email: string;

  constructor(username: string, email: string) {
    super();
    this.username = username;
    this.email = email;
  }
}
