/* eslint-disable */
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
    }).then((res) => this._parseResponse(res));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._parseResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
      // authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
    }).then((res) => this._parseResponse(res));
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
    }).then((res) => this._parseResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
    }).then((res) => this._parseResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.setLike(cardId) : this.deleteLike(cardId);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
    }).then((res) => this._parseResponse(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._parseResponse(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
      //  authorization: "bbf1f641-6a98-49f5-92b3-06f6d7f9fb32",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._parseResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api.askario.nomoreparties.co"
});

export default api;
