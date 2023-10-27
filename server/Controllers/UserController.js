import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get all users

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map(user => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json('user does not exist');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(12);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Access Denied! you can only update your own profile');
  }
};

// Delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json('User removed');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Access Denied! you can only delete your own profile');
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json('action denied');
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json('following');
      } else {
        res.status(403).json('You already followed user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

// unfollow a User
export const unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json('action denied');
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json('unfollowed');
      } else {
        res.status(403).json('not following');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
