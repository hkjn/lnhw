# lnhw

Chainlab 2018 hackathon project for a LN hardware wallet.

## Architecture

- Desktop app running patched c-lightning
  - patched to have the `hsm.c` parts, which handle private key material, done on the hw wallet
- HW wallet running Arduino project

## Subtree

The c-lightning project has been added as a subtree under `clightning` dir with:

* `git subtree add --prefix clightning https://github.com/elementsproject/lightning.git master --squash`

The subtree repo can be updated with:

* `git subtree pull --prefix clightning https://github.com/elementsproject/lightning.git master --squash`
