require('dotenv').config();

if(!process.env.PORT) throw new Error('Missing PORT')
if(!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET')
if(!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI')

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGOURL: process.env.MONGODB_URI
};

module.exports.config = config;
