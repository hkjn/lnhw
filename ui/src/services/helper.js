export function convertMSatToObv(mSat) {
    console.log("msat = " + mSat);
    const sat = mSat / 10**3;
    console.log("sat = " + sat);

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
    console.log("btc = " + btc);

    if (btc < 0.005) {
        console.log("mBTC = " + btc * 1000);

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
