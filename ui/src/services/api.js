import axios from 'axios';

export function getInfo () {
    return axios.get('/api/getinfo')
}
