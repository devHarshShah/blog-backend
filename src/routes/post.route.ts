import express from 'express'
import { CreatePostController, FetchPostsController } from '../controllers/post.controller'
import { protect } from '../middleware/protect.middleware'

const postRouter = express.Router()

postRouter.post('/post', protect, CreatePostController)
postRouter.get('/posts', protect, FetchPostsController)

export default postRouter