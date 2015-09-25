#!/bin/bash
#
# Copyright 2015 Eric Bidelman <ericbidelman@chromium.org>

# vulcanize elements.html \
#     --inline-script --inline-css --strip-comments | \
#     crisper -h elements.vulcanize.html -j elements.vulcanize.js

polybuild --maximum-crush elements.html
