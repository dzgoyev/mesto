// import { data } from "autoprefixer";

export default class Api {
  constructor(token) {
    this.baseUrl = token.baseUrl;
    this.headers = token.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err)
  })
  }
//   --------------
getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err)
  })
  }
  // ----------
  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
       method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
          name: data.name,
          about: data.job
      })
  })
      .then(res => {
          if(res.ok) {
              return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err)
    })
  }

  // -------------
  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name_card,
        link: data.link_img
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err)
  })
  }
  
  setLikes(url) {
    return fetch(`${this.baseUrl}/cards/likes/${url}`, {
        method: 'PUT',
        headers: this.headers,
    })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
}

delete(url) {
  return fetch(`${this.baseUrl}/cards${url}`, {
    method: 'DELETE',
    headers: this.headers,
})
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

updateAvatar(data) {
  return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.link_img 
      })
  })
      .then(res => {
          if(res.ok) {
          
              return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
          console.log(err)
      })
}

}
