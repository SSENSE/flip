#!/bin/sh
set -e

path=$(pwd)/$1

echo "$path"

printf "\n\033[0;36mStarting component transpilation on components in $1...\n"

if [ ! -x "$path" ]; then
    echo "\n\033[0;31mERROR: Your component directory was not found!\n"
    exit 1
fi

yarn babel-node src/index.js $1 --presets @babel/env &&

echo "\n\033[0;32mComponent Compilation successful.\n"

echo "\n\033[0;36mCreating bundles for React and Vue...\n"

yarn bundle:react --silent &&
yarn bundle:vue --silent

echo "\033[0;32mBundling successful!"
