import { config } from "dotenv"
import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import app from './app'
import { createConnection } from "typeorm"

const start = async () => {

  // ENV Config
  config()

  // DB Connection
  await createConnection().catch((err) => {
    console.error(`🏪 Database Connnection Failed. err: ${err}`)
    process.exit(1)
  })
  console.log("🏪 Database Connected")

  // Graphql Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.ts"]
    }),
  })
  // From the docs :p
  await apolloServer.start()
  // @ts-ignore
  apolloServer.applyMiddleware({ app })
  // @ts-ignore
  await app.listen(process.env.PORT || 3000)

  console.log(`🚀 Server to the MOOOON!`)

}

start()
//   .catch(err => {
//   console.log("⚠ Something messed up!")
//   console.error(`Error: ${err.details}`)
// })