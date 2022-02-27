#!/bin/zsh

# build the project
npm run build

# create appropriate branch targetting appropriate repository
git remote add child git@github.com:diareuse/gecko.git
git checkout --orphan feature/pages
git --work-tree dist add --all
git --work-tree dist commit -m "Release"

# upload
git push child HEAD:feature/pages --force

# cleanup
rm -rf dist
git checkout -f master
git branch -D feature/pages
git remote remove child