import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

//USER REGISTER
export const register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send('User created Successfully!');
  } catch (err) {
    next(err);
  }
};

//USER LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) return next(createError(404, 'user is not found!'));
    const matchPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!matchPassword) return next(createError(404, 'user and password not matched!'));
    //JWT
    const token = jwt.sign({ id: user._id, admin: user.isAdmin }, process.env.JWT_SECRET);

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};


