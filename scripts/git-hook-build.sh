#!/usr/bin/env bash

# Fake the NPM_TOKEN environment variable to prevent `yarn` to crash (it's not used to run scripts)
export NPM_TOKEN=""

yarn run build
