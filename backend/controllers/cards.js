const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const ForbiddenError = require('../errors/Forbidden');

const {
  CREATED_STATUS_CODE,
} = require('../utils/errors');

function getCards(req, res, next) {
  return Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(err));
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => {
      res
        .status(CREATED_STATUS_CODE)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки'
          )
        );
        return;
      }
      next(err);
    });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            res.send(card);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(
                new BadRequestError('Переданы некорректные данные карточки')
              );
              return;
            }
            next(err);
          });
        return;
      }
      throw new ForbiddenError(
        'Невозможно удалить карточку других пользователей'
      );
    })
    .catch((err) => next(err));
}

function likeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные для постановки лайка'
          )
        );
        return;
      }
      next(err);
    });
}

function dislikeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('Переданы некорректные данные для снятии лайка')
        );
        return;
      }
      next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
