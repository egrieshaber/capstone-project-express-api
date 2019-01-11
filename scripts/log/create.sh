#!/bin/bash

API="http://localhost:4741"
URL_PATH="/logs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "log": {
      "title": "'"${TITLE}"'",
      "text": "'"${TEXT}"'",
      "link": "'"${LINK}"'"
    }
  }'

echo
