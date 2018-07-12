#!/bin/bash

#   build ui container
docker run -it -v ${PWD}/ui:/usr/src/ui -v /usr/src/ui/node_modules -p 3000:3000 --rm   lnhw_ui
