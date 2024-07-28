import validator from 'validator';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Response, Request } from 'express';
import { User } from '../models/user.model.js';
import { loginSchema, registerSchema } from '../schema/auth.schema.js';
import dotenv from 'dotenv';

dotenv.config();

// TODO: If user already registered but otp not verified, resend otp
export const Registercontroller = async (req: Request, res: Response) => {
  const validatedRegisterBody = registerSchema.safeParse(req.body);

  if (!validatedRegisterBody.success) {
    console.error('Validation errors:', validatedRegisterBody.error.errors);
    return res.status(400).json({
      token: '',
      message: 'Invalid input',
      errors: validatedRegisterBody.error.errors, // Include validation errors in the response
    });
  }

  const { email, password } = validatedRegisterBody.data;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ token: '', message: 'Invalid email' });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
  ) {
    return res.status(400).json({
      token: '',
      message: 'Password must be at least 8 characters long and contain at least 1 number',
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser != null) {
    return res.status(400).json({ token: '', message: 'User already exists' });
  }
  const salt = genSaltSync(10);
  const hashedpassword = hashSync(password, salt);
  const insertUser = {
    ...validatedRegisterBody.data,
    password: hashedpassword,
  };
  const newUser = new User(insertUser);
  await newUser.save();
  const user = await User.findOne({ email });
  console.log(user);
  if (user === null) {
    return res.status(400).json({
      token: '',
      message: 'Failed to register account',
    });
  }
  res.status(200).json({ message: 'Sign Up Successful' });
};

export const Logincontroller = async (req: Request, res: Response) => {
  const validatedBody = loginSchema.safeParse(req.body);

  if (!validatedBody.success) {
    return res.status(400).json({
      token: '',
      message: 'Invalid input',
    });
  }

  const { email, password } = validatedBody.data;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ token: '', message: 'Invalid email or password' });
  }

  const user = await User.findOne({ email });
  if (user === null) {
    return res.status(400).json({ token: '', message: 'Invalid email or password' });
  }
  const result = compareSync(password, user.password);
  if (!result) {
    return res.status(400).json({ token: '', message: 'Invalid email or password' });
  }
  if (process.env.JWT_KEY) {
    const token = jwt.sign({ sub: user._id }, process.env.JWT_KEY, {
      expiresIn: '30d',
    });
    return res.json({ token, message: 'Successfully logged in!' });
  }
};
