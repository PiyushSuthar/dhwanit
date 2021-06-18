import { User } from "../../entity/User";
import { Field, InputType, ObjectType } from "type-graphql";
import { sign } from "jsonwebtoken"

// Input for Register
@InputType()
export class RegisterInput {
  @Field()
  firstname: string

  @Field()
  lastname: string

  @Field()
  email: string

  @Field()
  password: string
}

// Input for Login
@InputType()
export class LoginInput implements Partial<RegisterInput>{
  @Field()
  email: string

  @Field()
  password: string
}

// Response for Login
@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string

  @Field(() => User)
  user: User
}

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  })
}
export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d"
  })
}