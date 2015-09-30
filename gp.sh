#!/bin/bash

function _gp_usage() {
    echo "Compendium dev push/pull tool"
    echo ""
    echo "./gp.sh push      Resync dist files, pull origin changes, push local changes"
    echo "./gp.sh pull      Resync dist files, pull origin changes"
}

function _gp_resync() {
    echo "Resync dist files with origin"
    git checkout origin/develop -- dist/*.js
    git commit -m 'Dist file resync with origin'
}

function _gp_pull() {
    git pull --rebase origin develop
}

function _gp_push() {
    git push origin develop
}

function _require_clean_git() {
    if [ -n "$(git status --porcelain)" ]; then
        echo "Following files have uncommitted changes. Please, commit and try again.";
        git status --porcelain;
        exit 1;
    fi
}

case "$1" in
    pull)
        _require_clean_git
        _gp_resync
        _gp_pull
    ;;
    push)
        _require_clean_git
        _gp_pull
        _gp_push
    ;;
    *)
        _gp_usage
    ;;
esac
