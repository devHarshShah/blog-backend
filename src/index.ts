import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import authRouter from './routes/auth.route';
import postRouter from './routes/post.route';
import connectToDB from './intializers/db';
import bodyParser from 'body-parser';

const app: Application = express();
const port: number = 8000;

void connectToDB()

app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/blog', postRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});