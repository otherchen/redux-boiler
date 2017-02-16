import UserModel from '../models/user';
import auth from './auth';
import _ from 'lodash';

export default {
  login: function(body) {
    return UserModel.findOne({ email: body.email }).exec()
    .then((user) => {
      if(!user) {
        throw new Error('No user with that email exists');
      }
      return auth.compareHash(body.password, user.password)
      .then((match) => {
        if(!match) {
          throw new Error('Email or password is incorrect');
        }
        return auth.createToken(user.toObject());
      });
    });
  },
  register: function(body) {
    return UserModel.findOne({ email: body.email }).exec()
    .then((exists) => {
      if(exists) {
        throw new Error('User with that email already exists');
      } else {
        return auth.createHash(body.password);
      }
    })
    .then((hash) => {
      const data = _.merge({}, body, { password: hash });
      const user = new UserModel(data);
      return user.save();
    })
    .then((user) => {
      return this.login(body);
    });
  }
};
