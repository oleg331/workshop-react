const mongoUrl =
  "mongodb+srv://root:root@angular-edu-app-db-gvpze.mongodb.net/interns-database?retryWrites=true&w=majority";

const secret = "test";
const loggerMode = "dev";

const port = Number(process.env.PORT) || 3002;
const dbUrl = process.env.PROD_DB_URL || mongoUrl;

const config = {
  app: {
    port,
    secret,
    loggerMode
  },
  db: {
    url: dbUrl
  }
};

export default config;
