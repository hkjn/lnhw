import axios from 'axios';

function rpc(method, args) {
    return axios.post('/rpc', { method, args })
}

export function getInfo () {
    return rpc('getinfo')
}

export function pay (bolt11) {
    return rpc('pay', { bolt11 })
}

export function connect (id) {
    return rpc('connect', { peer_id: id })
}

export function listPeers () {
    return rpc('listpeers')
}

export function listFunds() {
    return rpc('listfunds')
}

export function listPayments() {
    return rpc('listpayments')
}

export function listInvoices() {
    return rpc('listinvoices')
}

export function fundChannel(channelId, satoshi) {
    return rpc('fundchannel', {
        channel_id: channelId,
        satoshi
    })
}
