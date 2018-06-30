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

export function listPeers () {
    return axios.post('/rpc', {
        method: 'listpeers',
    })
}

export function listFunds() {
    return axios.post('/rpc', {
        method: 'listfunds',
    })
}

export function fundchannel(channelId, satoshi) {
    return axios.post('/rpc', {
        method: 'fundchannel',
        args: {
            channel_id: channelId,
            satoshi
        }
    })
}
