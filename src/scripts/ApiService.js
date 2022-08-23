export default class ApiService {
  constructor(apiData) {
    this._token = apiData.token;
    this._id = apiData.identifier;
    this._URLBase = `https://mesto.nomoreparties.co/v1/${this._id}`;
  }

  _getResource(url) {
    return fetch(`${this._URLBase}${url}`, {
      headers: {
        authorization: this._token,
      },
    });
  }

  _patchResource(url, data) {
    return fetch(`${this._URLBase}${url}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    return this._getResource("/cards");
  }

  getProfileInfo() {
    return this._getResource("/users/me");
  }

  patchProfileData(data) {
    return this._patchResource("/users/me", data);
  }

  patchProfileAvatar(data) {
    return this._patchResource("/users/me/avatar", data);
  }

  postNewCard({ title: name, link }) {
    return fetch(`${this._URLBase}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._URLBase}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._URLBase}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      });
    } else {
      return fetch(`${this._URLBase}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      });
    }
  }
}
