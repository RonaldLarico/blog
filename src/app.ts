import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { postRoute } from './routes/post.route';
import { userRoute } from './routes/user.route';
import { profileRoute } from './routes/profile.route';
import { commentRoute } from './routes/comment.route';
import { categoryRoute } from './routes/category.route';
//import { postLikeRoute } from './routes/postLike.route';
import { handlerError } from './middlewares/handler.middlewares';

export const app = express();
//Development
app.use(morgan("dev"));
app.use(express.json());

app.use(postRoute);
app.use(userRoute);
app.use(profileRoute);
app.use(commentRoute);
app.use(categoryRoute);
//app.use(postLikeRoute);

app.use(handlerError)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: "ok" });
})

export default app;