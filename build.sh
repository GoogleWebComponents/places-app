#!/bin/bash
#
# Copyright 2015 Eric Bidelman <ericbidelman@chromium.org>

vulcanize elements.html \
    --inline-script --inline-css --strip-comments | \
    crisper -h elements.build.html -j elements.build.js

# polybuild --maximum-crush elements.html
