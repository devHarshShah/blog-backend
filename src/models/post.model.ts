import mongoose, { type Document, Schema, Types } from 'mongoose'
import { type IUser } from './user.model.js'

interface IPost extends Document {
  title: string
  content: string
  author: IUser['_id']
  created_at: Date
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
})

const Product = mongoose.model<IPost>('Post', PostSchema)

export default Product
