#!/bin/sh

# General Settings
pnpm config set store-dir /home/node/.local/share/pnpm/store


## git
git config --global --add safe.directory /workspaces/qiita-hackathon-2024-09-qualify
git config --global pull.rebase false
git pull

## Install dependencies
pnpm install

## create .env
cp ./frontend/.env.example ./frontend/.env

## migration
pnpm -C backend run migrate:local
pnpm -C backend run seed:local
