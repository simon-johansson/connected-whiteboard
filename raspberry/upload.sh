#!/usr/bin/env bash

# image options
FILENAME=$(date +"%Y-%m-%d-%H%M")
QUALITY=10
WIDTH=1000
HEIGHT=1000

# ftp options
HOST=$CW_FTP_HOST
USER=$CW_FTP_USER
PASSWORD=$CW_FTP_PASSWD
REMOTE_PATH=$CW_FTP_REMOTEPATH

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
curl -T $FILENAME.jpg ftp://$USER:$PASSWORD@$HOST/$REMOTE_PATH
