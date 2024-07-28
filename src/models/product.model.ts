import mongoose, { type Document, Schema, Types } from 'mongoose'
import { type IUser } from './user.model.js'

interface IProduct extends Document {
  name: string
  category: string
  owner: IUser['_id']
  width: number
  height: number
  length: number
  units: string
  glb_uploaded: boolean
  usdz_uploaded: boolean
  created_at: Date
  wallMount: boolean
  ext: string
  deleted: boolean
  deletedAt: Date
  annotations: string
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User', required: true },
  width: { type: Number },
  height: { type: Number },
  length: { type: Number },
  units: { type: String },
  glb_uploaded: { type: Boolean, default: false },
  usdz_uploaded: { type: Boolean, default: false },
  wallMount: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  ext: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  annotations: { type: String }
})

const Product = mongoose.model<IProduct>('Product', ProductSchema)

export default Product
