#!/usr/bin/env bash

ret=0
cd `dirname $0`
npm start & sleep 1
nodeunit init.js user.js || ret=1
kill %1
exit $ret
