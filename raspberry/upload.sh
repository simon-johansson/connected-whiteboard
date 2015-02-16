#!/usr/bin/env bash

# image options
FILENAME=$(date +"%Y-%m-%d-%H%M")
QUALITY=10
WIDTH=1000
HEIGHT=1000

# server options
USER="sijo"
SERVER="trol.la"
REMOTE_PATH="public_html/connected-whiteboard/images"

# USER="sijoh006"
# SERVER="web371.webfaction.com"
# REMOTE_PATH="webapps/connected_whiteboard/images"

# remove old images
rm -rf /home/pi/*.jpg

# takte photo
raspistill -q $QUALITY -w $WIDTH -h $HEIGHT -vf -hf -o /home/pi/tmp.jpg

# "0,0 0,0   450,2000 0,2000   1600,2000 2000,2000   2000,0 2000,0" \
# imagemagick
convert tmp.jpg \
  -matte \
  -virtual-pixel transparent \
  -distort Perspective \
  "0,0 0,0   225,1000 0,1000   800,1000 1000,1000   1000,0 1000,0" \
  $FILENAME.jpg

# upload image
scp $FILENAME.jpg $USER@$SERVER:$REMOTE_PATH
