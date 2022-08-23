export default class UserInfo {
  constructor(profileBlockSelector, nameSelector, aboutSelector, avatarSelector) {
    this.profileElement = document.querySelector(profileBlockSelector);
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._nameElement.textContent, about: this._aboutElement.textContent };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserAvatar({ avatar: source }) {
    this._avatarElement.src = source;
  }

  setUserId({ _id: id }) {
    this.userId = id;
  }

  isDataNew(oldData, newData) {
    return oldData.name !== newData.name || oldData.about !== newData.about;
  }
}
