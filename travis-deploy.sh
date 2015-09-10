#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" != "master" ]; then
    exit 0;
fi

grunt travis:deploy
