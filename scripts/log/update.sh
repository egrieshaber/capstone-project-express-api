#!/bin/bash

API="http://localhost:4741"
URL_PATH="/logs"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
