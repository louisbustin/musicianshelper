import * as dotenv from 'dotenv';
dotenv.config();

export const dbconfig = {
   'database': `mongodb+srv://bracketwebmongo:${process.env.bracketwebmongopass}@cluster0.v3yjo.mongodb.net/bracketweb?retryWrites=true&w=majority`,
  };

