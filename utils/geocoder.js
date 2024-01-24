import axios from 'axios';
axios
  .get(
    'https://ipgeolocation.abstractapi.com/v1/?api_key=ca359a09d9574794991771551f38a1e0&ip_address=39.46.181.190'
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
