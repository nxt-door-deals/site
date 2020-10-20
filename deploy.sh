#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'main' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  rsync -a client/.next client/package.json cient/package-lock.json travis@68.183.94.49:/home/nxtdoordeals/site
else
  echo "Not deploying, since the branch isn't main."
fi