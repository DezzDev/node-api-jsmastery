import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDataBase from './database/mongoDb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { PORT } from './config/env.js';


const app = express();

// middleware
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded, 
// help us to process the data from the form
app.use(express.urlencoded({ extended: true }));
// parse cookies from the request headers and populate req.cookies with an object keyed by the cookie names. 
// this need be imported before the routes
app.use(cookieParser())
// error middleware
app.use(errorMiddleware)

// routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)

app.get('/', (req, res) => {
  res.send('Hello World !');
})



app.listen(PORT, async () => {
  console.log(`App listening on port: ${PORT}`);

  // Connect to database
  await connectToDataBase();
})

export default app;
