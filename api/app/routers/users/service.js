import { extractDataFromModelInstances } from 'utils/models';
import { encryptPassword } from 'utils/auth';
import User from './model';

class UserService {
  static getUsers = async() => {
    const users = await User.find({});

    if (!users) {
      throw Error('Users not found');
    }

    return extractDataFromModelInstances(users);
  };

  static getUserInstanceByEmail = async (email) => {
    const user = await User.findOne({ email }, '+password');

    if (!user) {
      throw Error('User not found');
    }

    return user.getData();
  };

  static getUserInstanceByEmailForPassport = async (email) => {
    const user = await User.findOne({ email }, '+password');

    return user;
  };

  static getUserInstanceById = async(id) => {
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw Error('User not found');
    }
    return user.getData();
  };

  static getUserInstanceByIdForPassport = async(id) => {
    const user = await User.findOne({ _id: id });

    return user;
  };

  static createUser = async(email, password, name) => {
    const encryptedPassword = await encryptPassword(password);
    const newUserData = {
      email,
      password: encryptedPassword,
      name: name || email.split('@')[0]
    };

    const newUser = await new User(newUserData);
    newUser.save();

    return newUser.getData();
  }
}

export default UserService;
