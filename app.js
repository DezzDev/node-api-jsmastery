import express from 'express';
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import {PORT} from './config/env.js';

const app = express();

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)

app.get('/', (req, res) => {
    res.send('Hello World !');
})



app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})

export default app;
