export default class UserInfo {

  constructor({ profileNameSelector, profileJobSelector,  profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    this._userData = { 
      nick: this._profileName.textContent, 
      job: this._profileJob.textContent 
    };
    return this._userData;
  }

  setUserInfo({nick, job}) {
    this._profileName.textContent = nick;
    this._profileJob.textContent = job;
  }

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
  }

}