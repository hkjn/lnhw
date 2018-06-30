# lnhw

Chainlab 2018 hackathon project for a LN hardware wallet.

## Architecture

- `ui` layer: what's shown directly to the user, on both `hardware` wallet and `client` app
- `client` layer: patched c-lightning and possible wrappers, running on linux desktop (possibly mobile later)
- `hardware` layer: code running on Arduino devices for secure wallet
