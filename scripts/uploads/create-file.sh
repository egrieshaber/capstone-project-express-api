#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --header "Authorization: Bearer ${TOKEN}" \
  --form audio="${AUDIO_PATH}" \
  --form title="${TITLE}" \
  --form url="${URL}" \

echo
