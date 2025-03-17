import {config} from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

console.log({node_env : process.env.NODE_ENV});

export const {PORT, NODE_ENV, DB_URI} = process.env;