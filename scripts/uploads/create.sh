#!/bin/bash

API="https://warm-plateau-38122.herokuapp.com/"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "upload": {
      "url": "'"${URL}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
