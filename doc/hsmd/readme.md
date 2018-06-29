# Internal structure of HSM deamon

# Top-level design

C-lightning uses a multi-process architecture where several processes communicate with each other and incapsulate certain functionality of the program. There is a master deamon `lightningd` that holds all high-level logic and also takes care of communication to other nodes. It spawns severa child processes:

- `hsmd` that we are interseted in, it handles all the secrets and signs whatever needs to be signed
- `gossipd` - used to find out about other nodes and their channels to find routes for payments
- `onchaind` - manages on-chain funds (normal, non-lightning ballance)
- `openingd` - opens channels
- `channeld` - takes care of channel management, channel updates, announcements, hopes and so on
- `closingd` - closes channels

All these deamons can talk to `hsmd` and ask for signatures, public keys and everything else required for their operation. We need to replace original `hsmd` with our custom one that talks to the hardware wallet.

# `hsmd` daemon

We only touch `hsmd/hsm.c`. We don't want to do anything with other files as they only define interface between deamons.

## `init_hsm()` 

### `maybe_create_new_hsm()`

When `hsmd` deamon start it first checks if there is a `hsm_secret` file in `~/.lightning/` folder, and if not - generates a new random sequence of bytes and saves it into that file. We want to replace it with asking the hardware if it has a secret and generating a new secret if necessary. This action will require user confirmation on the hardware device (*"Do you want to pair the devices?"*). We also should consider replacing a random 32-byte number with a 12-24 word seed that can be backed up by the human. It's just better in sense of UX.

### `load_hsm()`

Then `hsmd` loads content of the `hsm_secret` file (that is just a 32-byte array) into the `secretstuff` structure. In particular, into the `secretstuff.hsm_secret`. Afterwards it derives a `bip32` key from this secret and stores it in `secretstuff.bip32` field.

### `populate_secretstuff()`

Key derivation works as follows:

- it uses `hsm_secret` to create an [HD wallet](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) by first applying [HKDF](https://en.wikipedia.org/wiki/HKDF) algorithm to it. In particular it uses `hsm_secret` as input key material (data), `0` as salt (increments if fails to create a key) and `"bip32 seed"` string as info field. From this function it gets a new 32-byte secret that it uses as a seed for HD wallet. It derives a child with a path `m/0/0` from this wallet and stores it in `secretstuff.bip32` field.

Now we have everything necessary in the `secretstuff` structure.

### Example

```
secretstuff.hsm_secret: 1e14cd384691a92120f6702742ca0e06951aeee57e91b5e137526c0a6c0867f4
bip32 seed: 5a9bed3df01abd7aa0f260120530aaf1eea3ac2744648975dc23cfb25a71045d
bip32 master key: xprv9s21ZrQH143K4Swn4rdeRhPLPfN1qJtA6yFR5RBTpU2s614zG7ELFMN6YAW4AGH3jZRJUUQBuPt9pJ5D5jzq65PKWCBy6xNarQAcgofD3Xr
secretstuff.bip32: xprv9wYsM6fW2kCzYkSeu3AFZrJ7bk4Ny3w3L5UaLDKLxLizJcacRNGCVwouqJSNNqoi4DGdA6cf3kFEUDvmSdpCyQu8sYg4x44cpVbUFVpSXkc
```

