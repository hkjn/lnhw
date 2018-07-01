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
            value: Number(sat).toFixed(3),
            curr: 'sat'
        };
    }

    const btc = sat / 10**8;
    console.log("btc = " + btc);

    if (btc < 0.005) {
        console.log("mBTC = " + btc * 1000);

        return {
            value: Number(btc * 1000).toFixed(4),
            curr: 'mBTC'
        };
    }

    return {
        value: Number(btc).toFixed(5),
        curr: 'BTC'
    };
}
