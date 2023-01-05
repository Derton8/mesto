import { data } from "autoprefixer";

export default class Api {

  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleCorrectResponse(response) {
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }


  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: this._headers
    });
    return await this._handleCorrectResponse(response);
  }

  async getCardsList() {
    const response = await fetch(`${this._url}/cards`, {
      headers: this._headers
    });
    return await this._handleCorrectResponse(response);
  }

  async setUserInfo({job, nick}) {
    const response = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: nick,
        about: job
      })
    });
    return await this._handleCorrectResponse(response);
  }

  async addNewCard({name, link}) {
    const response = await fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
    return await this._handleCorrectResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    });
    return await this._handleCorrectResponse(response);
  }

}