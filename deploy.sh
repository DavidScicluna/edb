#!/usr/bin/env sh

# abort on errors
sudo  set -e

# build
sudo npm run build

# navigate into the build output directory
sudo cd build

# place .nojekyll to bypass Jekyll processing
sudo echo > .nojekyll

sudo git init
sudo git checkout -B master
sudo git add -A
sudo git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
sudo git push -f git@github.com:davidscicluna/edb.git master:gh-pages

sudo cd -