function pollWalletIsConnected(callback) {
    // call walletIsConnected every second
    // run callback() on the result
    return
}

function walletIsConnected() {
    return
}

function createChannel(amount, bitcoinAddress, peerAddress) {
    // client handles hardware wallet interaction here ...

    // possible return values
    // 1. user confirmed on hardware
    // 2. user didn't confirm
    // 3. error

    return
}

// function closeChannel(amount, bitcoinAddress, peerAddress) {
//     return
// }

function estimateChannelOpenFee() {
    return
}

function estimateRoutingFee() {
    return
}

function createTransaction(amount, bitcoinAddress) {
    // client handles hardware wallet interaction here ...

    // possible return values
    // 1. user confirmed on hardware
    // 2. user didn't confirm
    // 3. error

    return
}

function listTransactions() {
    return
}

function pollTransactionState(transaction) {
    return
}


function listChannels() {
    return
}

function getLightningInfo() {
    // What's my lightning address? etc ...
    return
}
