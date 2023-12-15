
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: 'd588555b-0738-4ae4-bf1a-640bce42094e',
      'Content-Type': 'application/json'
    }
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