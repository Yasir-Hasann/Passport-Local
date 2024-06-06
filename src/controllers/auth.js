// module imports
const asyncHandler = require('express-async-handler');

// file imports
const UserModel = require('../models/user');
const ErrorResponse = require('../utils/error-response');

// @desc   Login User
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc   Register User
// @route  POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  if (!user) return next(new ErrorResponse('Something went wrong', 500));

  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

// @desc   Change Password
// @route  POST /api/v1/auth/change-pass
// @access Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const { password, oldPassword } = req.body;
  if (!password || !oldPassword) return next(new ErrorResponse('field `password`, `oldPassword` is required', 404));

  const user = await UserModel.findById(_id).select('+password');
  if (!user) return next(new ErrorResponse("Password couldn't be updated at this moment", 500));

  const isMatch = await user.matchPasswords(oldPassword);
  if (!isMatch) return next(new ErrorResponse('Invalid Old Password!', 401));

  const hashedPass = await user.setPassword(password);
  const save = await UserModel.findByIdAndUpdate(_id, { password: hashedPass });
  if (!save) return next(new ErrorResponse("Password couldn't be updated at this moment", 500));

  res.status(200).json({ success: true, message: 'Password Change Success!' });
});

// @desc   Get user
// @route  GET /api/v1/auth/whoami
// @access Private
exports.whoami = asyncHandler(async (req, res, next) => {
  const { createdAt, updatedAt, __v, ...rest } = req.user._doc;
  res.status(200).json(rest);
});
