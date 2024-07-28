import mongoose, { type Document, Schema } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
  createdAt: Date
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model<IUser>('User', UserSchema)

export { type IUser, User }
