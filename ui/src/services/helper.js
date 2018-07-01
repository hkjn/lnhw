export function convertMSatToObv(mSat) {
    let sat = mSat / 10**3;

    //  is sat
    if (sat < 1) {
        return {
            value: mSat,
            curr: 'msat'
        };
    }

    if (sat < 10**4) {
        return {
            value: sat,
            curr: 'sat'
        };
    }

    const btc = sat / 10**8;

    if (btc < 0.005) {
        return {
            value: btc * 1000,
            curr: 'mBTC'
        };
    }

    return {
        value: btc,
        curr: 'BTC'
    };
}
