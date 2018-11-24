#!/usr/bin/env bash
rm -fr node_modules/puppeteer/.local-chromium

sam package \
    --template-file aws/template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket jam-be
npm i