#!/usr/bin/env bash

ret=0
cd `dirname $0`
npm start & sleep 0.5
nodeunit init.js list.js user.js movie.js || ret=1
kill %1
exit $ret
