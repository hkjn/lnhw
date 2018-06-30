import axios from 'axios';

export function fetchIsConnected () {
    return axios.get(`https://jsonplaceholder.typicode.com/users`);
}
