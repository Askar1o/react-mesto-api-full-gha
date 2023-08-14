const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequest');
const UnauthorizedError = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFound');
const ConflictError = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  CREATED_STATUS_CODE,
} = require('../utils/errors');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
}

function getUser(req, res, next) {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректно введен id пользователя'));
        return;
      }
      next(err);
    });
}

function findUserMe(req, res, next) {
  User.findById(req.user._id)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email
  } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => res.status(CREATED_STATUS_CODE).send({
          data: {
            name,
            about,
            avatar,
            email,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(
              new BadRequestError(
                'Переданы некорректные данные при создании пользователя'
              )
            );
            return;
          }
          if (err.code === 11000) {
            next(
              new ConflictError('Пользователь с таким e-mail уже существует')
            );
            return;
          }
          next(err);
        });
    })
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new UnauthorizedError('Неправильные почта или пароль'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  findUserMe,
};
