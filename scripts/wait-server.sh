#!/usr/bin/env bash
attempt_counter=0
max_attempts=120

echo "Waiting for server to be up"
echo "${SERVER_URL}"
until curl --output /dev/null --silent --head --fail "http://localhost:3000"; do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    printf '.'
    attempt_counter=$((attempt_counter+1))
    sleep 1
done

echo 'Server is up'
