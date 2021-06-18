
module.exports = {
  "type": "postgres",
  "name": "default",
  "synchronize": true,
  "logging": true,
  "host": process.env.TYPEORM_HOST || "localhost",
  "port": process.env.TYPEORM_PORT || 5432,
  "username": process.env.TYPEORM_USERNAME || "piyushsuthar",
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE || "ts_gql_boilerplate",
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
