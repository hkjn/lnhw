# lnhw

Chainlab 2018 hackathon project for a LN hardware wallet.

## Architecture

- UI layer: what's shown to the user, on both hardware wallet and client app
- Client app
  - Running on desktop app (and possibly mobile in later stage) running patched c-lightning
  - c-lightning will be atched to have the `hsm.c` parts, which handle private key material, done on the hw wallet
- hardware wallet running Arduino project

## Subtree

The c-lightning project has been added as a subtree under `clightning` dir with:

* `git subtree add --prefix clightning https://github.com/elementsproject/lightning.git master --squash`

The subtree repo can be updated with:

* `git subtree pull --prefix clightning https://github.com/elementsproject/lightning.git master --squash`
