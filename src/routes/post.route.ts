import express from 'express'
import { CreatePostController,GetSpecificPostController, DeletePostController, FetchMyPostsController, FetchPostsController } from '../controllers/post.controller'
import { protect } from '../middleware/protect.middleware'

const postRouter = express.Router()

postRouter.post('/post', protect, CreatePostController)
postRouter.get('/post', protect, GetSpecificPostController)
postRouter.get('/posts', protect, FetchPostsController)
postRouter.get('/myposts', protect, FetchMyPostsController)
postRouter.delete('/post', protect, DeletePostController)

export default postRouter