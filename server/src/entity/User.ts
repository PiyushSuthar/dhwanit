import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => String)
  @Column("text")
  firstname: string

  @Field(() => String)
  @Column("text")
  lastname: string

  @Field(() => String)
  fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  @Column("text", {
    unique: true
  })
  email: string

  @Column("text")
  password: string

  @Column("int", {
    default: 0
  })
  tokenVersion: number
}