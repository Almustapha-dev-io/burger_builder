import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-89e33-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;