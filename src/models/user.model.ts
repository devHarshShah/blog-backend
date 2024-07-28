import mongoose, { type Document, Schema } from 'mongoose'
import { generateKey } from '../helpers/keygen.js'
// import { number } from 'zod'
// import { boolean } from 'zod'

interface IUser extends Document {
  name: string
  email: string
  phone: string
  password: string
  companyName: string
  website: string
  description: string
  reference: string
  otp: number
  otpVerification: boolean
  flag: boolean
  apiKey: string
  credits: string
  createdAt: Date
  role: string
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  companyName: { type: String, default: '' },
  website: { type: String, default: '' },
  description: { type: String, default: '' },
  reference: { type: String, default: '' },
  otp: { type: Number },
  otpVerification: { type: Boolean, default: false },
  flag: { type: Boolean, default: true }, // set to true for now-- will change once admin dashboard controller is implemented
  apiKey: { type: String, required: true, default: () => generateKey(64) },
  credits: { type: String, default: '5' },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: 'User' }
})

const User = mongoose.model<IUser>('User', UserSchema)

export { type IUser, User }
