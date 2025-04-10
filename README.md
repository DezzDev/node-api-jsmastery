# architecture and guide

- Setting up a monolithic backend
- Using Node.js and Express.js
- Connecting to a MongoDb database
- Securing your API with Arcjet
- Automating subscription tracking with Upstash Workflows

## dependencies

- npx express-generator --no-view --git -> to create a project quick
- npm install -D nodemon -> to refresh changes
- npx eslint --init -> linter , remember set up eslint in settings
- npm install dotenv -> environment variables
- npm install mongodb -> driver for connect to mondoDb-atlas
- npm install mongoose -> Orm to mongoDb
- npm install jsonwebtoken -> authentication
- npm install bcryptjs -> allow us to generate randomized strings to hash our passwords
- npm install @arcjet/node -> to protect our api from bot
- npm install @upstash/workflow -> to create a workflow to send emails
- npm install dayjs -> to management dates more easy
- npx @upstash/qstash-cli dev -> to test upstash in locally, this start a upstash server
- npm install nodemailer -> to send email notification

## video

<https://www.youtube.com/watch?v=rOpEN1JDaD0&t=2093s>
56:00
