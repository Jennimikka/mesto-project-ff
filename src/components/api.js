
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: 'd588555b-0738-4ae4-bf1a-640bce42094e',
      'Content-Type': 'application/json'
    }
  }

  export const setUserAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });


  } 

  export const saveCards = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify(data),      
        "likes": [],
        "_id": "657c61d1995b8961bd2506d5",       
       'Content-Type': 'application/json'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });


  } 

  export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  
 
    export const LikeCards = (id, isLiked) => {
        return isLiked
          ? fetch(`${config.baseUrl}/cards/${id}/likes`, {
              method: "PUT",
              headers: config.headers,
            }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
          : fetch(`${config.baseUrl}/cards/${id}/likes`, {
              method: "DELETE",
              headers: config.headers,
            }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
      }
    