#!/usr/bin/env bash
sam package \
    --template-file aws/template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket jam-be