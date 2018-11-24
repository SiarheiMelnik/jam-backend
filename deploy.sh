#!/usr/bin/env bash
sam deploy \
    --template-file packaged.yaml \
    --stack-name jam-be  \
    --capabilities CAPABILITY_IAM \
    --region us-east-1