#!/usr/bin/env bash

build() {
  rm -rf dist
  exitIfNeed '删除dist文件失败'
  yarn build
  exitIfNeed 'build failed!'
}

case "$1" in
 *)
  build
esac

exitIfNeed 'build failed!'
exit 0