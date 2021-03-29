import * as dotenv from 'dotenv';
dotenv.config();

export const dbconfig = {
   'database': `mongodb+srv://musicianshelperdbuser:${process.env.mongodbpass}@cluster0.z3l1v.mongodb.net/musicianshelper?retryWrites=true&w=majority`,
  };

