import { User } from "../../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { compare, hash } from 'bcrypt'
import { createAccessToken, LoginInput, LoginResponse, RegisterInput } from "./utils";
import { ApolloError } from "apollo-server-express";

@Resolver()
export class AuthResolver {

  @Mutation(() => User)
  async register(
    @Arg("data") data: RegisterInput,
  ) {
    const { firstname, lastname, email, password } = data
    try {
      const hashedPassword = await hash(password, 12)
      let user = new User()

      user.email = email
      user.firstname = firstname
      user.lastname = lastname
      user.password = hashedPassword

      await user.save()
      return user
    } catch (err) {
      throw new ApolloError("Failed to register user " + err);
    }
  }


  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") data: LoginInput
  ): Promise<LoginResponse> {
    const { email, password } = data

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      throw new ApolloError("Incorrect Credentials");
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      throw new ApolloError("Incorrect Credentials");
    }

    let accessToken = createAccessToken(user)

    return {
      accessToken,
      user: user
    }
  }

  @Query(() => String)
  me() {
    return "Hello Piyush"
  }

}