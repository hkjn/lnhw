import axios from 'axios';

export function getInfo () {
    return axios.post('/rpc', {
        method: 'getinfo'
    })
}

export function pay (bolt11) {
    return axios.post('/rpc', {
        method: 'pay',
        args: {
            bolt11
        },
    })
}
