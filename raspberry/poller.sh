#!/usr/bin/env bash

PATHNAME="api/things/raspberry-pi-config"
DEV_HOST="http://192.168.0.16:9000/$PATHNAME"
HOST="http://cw.trol.la/$PATHNAME"
TMP_FILE=tmp.json
LATEST_PHOTO=latest_photo.json

checkDiff(){
  if [ ! -f $LATEST_PHOTO ]; then
      cp $TMP_FILE $LATEST_PHOTO
  fi
  if diff $LATEST_PHOTO $TMP_FILE >/dev/null ; then
    :
  else
    # Take photo
    echo "New file. Taking photo"
    mv $TMP_FILE $LATEST_PHOTO
  fi
}

while true
do
  wget -q $DEV_HOST -O $TMP_FILE
  checkDiff
  sleep 5
done

