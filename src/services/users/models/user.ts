import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  firstName: string = "";

  @Column()
  lastName: string = "";

  @Column()
  age: number = 0;
}
