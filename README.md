# lnhw

Chainlab 2018 hackathon project for a LN hardware wallet.

## Architecture

- `ui` layer: what's shown directly to the user, on both `hardware` wallet and `client` app
- `client` layer: patched c-lightning and possible wrappers, running on linux desktop (possibly mobile later)
- `hardware` layer: code running on Arduino devices for secure wallet

### `client` notes

We have a fork of c-lightning at [hkjn/lightning](https://github.com/hkjn/lightning), where we
are adding support to allow the private key material to stay on the hardware wallet and not
be exposed to the client device (Linux laptop).

There's some notes by @stepansnigirev at [doc/hsmd/readme.md](doc/hsmd/readme.md) that outline the structure of c-lightning. 
