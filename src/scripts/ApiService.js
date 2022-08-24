export default class ApiService {
  constructor(apiData) {
    this._token = apiData.token;
    this._id = apiData.identifier;
    this._URLBase = `https://mesto.nomoreparties.co/v1/${this._id}`;
    this._errorMessages = {
      profileLoad: "Данные не грузятся... Сервер спит... А бэкендеры уже нет",
      inititalCards: "Данные не грузятся... Сервер спит... А бэкендеры уже нет",
      deleteCard: "Возникла проблема с удалением карточки, обновите страницу и повторите запрос",
      postCard: "Возникла проблема с добавлением фотографии",
      avatarUpdate: "Возникла проблема с обновлением картинки профиля, обновите страницу и повторите запрос",
      profileUpdate: "Не получилось обновить данные профиля...",
      toggleLike: "Возникла проблема с проставкой лайка",
    };
  }

  _checkResponse(request, errText) {
    return request.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${errText} \nStatus: ${res.status}`);
    });
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
    return this._checkResponse(this._getResource("/cards"), this._errorMessages.inititalCards);
  }

  getProfileInfo() {
    return this._checkResponse(this._getResource("/users/me"), this._errorMessages.profileLoad);
  }

  patchProfileData(data) {
    return this._checkResponse(this._patchResource("/users/me", data), this._errorMessages.profileUpdate);
  }

  patchProfileAvatar(data) {
    return this._checkResponse(this._patchResource("/users/me/avatar", data), this._errorMessages.avatarUpdate);
  }

  postNewCard({ title: name, link }) {
    const newProm = fetch(`${this._URLBase}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    });

    return this._checkResponse(newProm, this._errorMessages.postCard);
  }

  deleteCard(cardId) {
    const newProm = fetch(`${this._URLBase}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });

    return this._checkResponse(newProm, this._errorMessages.deleteCard);
  }

  toggleLike(cardId, isLiked) {
    let newProm;

    if (isLiked) {
      newProm = fetch(`${this._URLBase}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      });
    } else {
      newProm = fetch(`${this._URLBase}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      });
    }

    return this._checkResponse(newProm, this._errorMessages.toggleLike);
  }
}
