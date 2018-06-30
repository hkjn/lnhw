import axios from 'axios';

export function getInfo () {
    return axios.get('/api/getinfo')
}

export function pay (bolt11) {
    return axios.post('/api/pay', {
        bolt11
    })
} 
