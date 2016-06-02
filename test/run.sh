#!/usr/bin/env bash

cd `dirname $0`
ret=0
tmpDbFile=$(mktemp /tmp/dbXXXXXX.sql)
username=$(./option.js db.user)
password=$(./option.js db.password)
dbName=$(./option.js db.name)
tmpDbName=$dbName.test

if ! mysql -u $username -p$password $tmpDbName <&-; then
    echo -n "Creating database \`$tmpDbName\`."
    mysqldump -d --skip-comments -u $username -p$password $dbName | sed 's/ AUTO_INCREMENT=[0-9]*//g' > $tmpDbName
    echo -n '.'
    mysql -u $username -p$password <<< "CREATE DATABASE \`$tmpDbName\`"
    echo -n '.'
    mysql -u $username -p$password $tmpDbName < $tmpDbName
    echo '.'
fi

npm start & sleep 0.5
nodeunit init.js list.js user.js movie.js release.js link.js || ret=1
kill %1
rm -f $tmpDbFile
exit $ret
