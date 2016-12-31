#!/usr/bin/env bash

cd `dirname $0`
ret=0
tmpDbFile=$(mktemp /tmp/dbXXXXXX.sql)
tmpConfigFile=$(mktemp /tmp/configXXXXXX.json)
username=$(./option.js db.user)
password=$(./option.js db.password)
dbName=$(./option.js db.name)
tmpDbName=$dbName.test
port=$(./getPort.js)
init=0

if ! mysql -u $username -p$password $tmpDbName < /dev/null ; then
    init=1
    echo -n "Creating database \`$tmpDbName\`."
    mysqldump -d --skip-comments -u $username -p$password $dbName | sed 's/ AUTO_INCREMENT=[0-9]*//g' > $tmpDbFile
    echo -n '.'
    mysqldump -t --skip-comments -u $username -p$password $dbName ListAudioCodecs ListCompressions ListContainers ListLanguages ListQualities ListSources ListVideoCodecs Config  | sed 's/ AUTO_INCREMENT=[0-9]*//g' >> $tmpDbFile
    echo -n '.'
    mysql -u $username -p$password <<< "CREATE DATABASE \`$tmpDbName\`"
    echo -n '.'
    mysql -u $username -p$password $tmpDbName < $tmpDbFile
    echo '.'
fi

cat > $tmpConfigFile <<EOF
{
  "db": {
    "name": "$tmpDbName",
    "user": "$username",
    "password": "$password",
    "host": "localhost"
  },
  "port": $port
}
EOF

CONFIG_FILE=$tmpConfigFile npm start & sleep 0.5
[ $init -eq 1 ] && PORT=$port ./addRootUser.js
PORT=$port nodeunit duration.js init.js list.js user.js movie.js release.js link.js search.js config.js permission.js || ret=1
kill %1
rm -f $tmpDbFile $tmpConfigFile
exit $ret
