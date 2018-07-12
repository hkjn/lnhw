# Hardware wallet sketch

## Unknown commands

Currently it asks user confirmation for any unknown command and sends back either `success: <command>` or `error: user cancelled`.

It can be used for testing c-lightning stuff with not implemented things in hardware.

## Known commands

It can parse bitcoin tx and show output values. For example, try sending command this to the wallet:

```
sign_funding_tx 0200000000010118368c4544a4b36694f8da9fdcbf82afe8bcfc6a887c9e82ca0c772ffcdd854c01000000171600143a71fb69c93e3159021470b591487bb18492949fffffffff0240420f000000000022002029c9c94a2d5e9a1a4ea61dd2555711413e0119aee26721a7a0680b1abbbd9d058f53890000000000160014a47ffbf007f62369ca593e2089431d3dc9f2176002483045022100834209758f43f82956fe194e2d6575cd47849f2166d3b951caf001e05abc3c0702206bb143fb195cc7fd39c07d327cea3ec54d911bb78433b5d3d88403d283ee685601210329b05bef6e13529fae67827b61a718afa41fd42a669b87b46af767ed20305dcf00000000
```

You will see two outputs: 10 mBTC funding channel and 90 mBTC change.