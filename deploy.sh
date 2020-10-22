#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'main' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  cd client
  rsync -a --exclude={'/node_modules'} travis@68.183.94.49:/home/nxtdoordeals/site
  echo "Deployed successfully!"
else
  echo "Not deploying, since the branch isn't main."
fi