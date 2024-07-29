import validator from 'validator';
import type { Response, Request } from 'express';
import { User } from '../models/user.model.js';
import Post from '../models/post.model.js';
import { postSchema } from '../schema/post.schema.js';
import dotenv from 'dotenv';

dotenv.config();

export const CreatePostController = async (req: Request, res: Response) => {
  try {
    const userID: string | null = req.body.decoded.sub;
    if (userID == null) {
      console.log('Invalid user ID');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userID);
    if (user == null) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }

    const validatedRegisterBody = postSchema.safeParse(req.body);
    if (!validatedRegisterBody.success) {
      console.error('Validation errors:', validatedRegisterBody.error.errors);
      return res.status(400).json({
        token: '',
        message: 'Invalid input',
        errors: validatedRegisterBody.error.errors,
      });
    }

    const { title, content } = validatedRegisterBody.data;
    const productInfo = {
      title: title,
      content: content,
      author: user._id,
    };

    const product = new Post(productInfo);
    await product.save();
    return res.status(201).json({ message: 'Post created' });
  } catch (error) {
    console.error('Error in CreatePostController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const FetchPostsController = async (req: Request, res: Response) => {
  try {
    const authorId = req.query.author;
    if (authorId) {
      if (!validator.isMongoId(authorId as string)) {
        return res.status(400).json({ message: 'Invalid author ID' });
      }
      const posts = await Post.find({ author: authorId }).populate('author', 'name');
      return res.status(200).json(posts);
    } else {
      const posts = await Post.find().populate('author', 'name');
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error('Error in FetchPostsController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const FetchMyPostsController = async (req: Request, res: Response) => {
  try {
    const authorId: string | null = req.body.decoded.sub;
    if (authorId == null) {
      console.log('Invalid user ID');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(authorId);
    if (user == null) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }
    if (authorId) {
      if (!validator.isMongoId(authorId as string)) {
        return res.status(400).json({ message: 'Invalid author ID' });
      }
      const posts = await Post.find({ author: authorId }).populate('author', 'name');
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error('Error in FetchPostsController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const DeletePostController = async (req: Request, res: Response) => {
  try {
    const postId = req.query.id;
    if (postId) {
      if (!validator.isMongoId(postId as string)) {
        return res.status(400).json({ message: 'Invalid Post ID' });
      }
      const posts = await Post.findByIdAndDelete(postId);
      return res.status(200).json(posts);
    } else {
      return res.status(400).json('Error Occured');
    }
  } catch (error) {
    console.error('Error in FetchPostsController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const GetSpecificPostController = async (req: Request, res: Response) => {
  try {
    const authorId: string | null = req.body.decoded.sub;
    const postId = req.query.id;
    if (authorId == null) {
      console.log('Invalid user ID');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(authorId);
    if (user == null) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }
    if (authorId) {
      if (!validator.isMongoId(authorId as string)) {
        return res.status(400).json({ message: 'Invalid author ID' });
      }
      const post = await Post.findOne({ _id: postId }).populate('author', 'name');
      return res.status(200).json(post);
    }
  } catch (error) {
    console.error('Error in FetchPostsController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};