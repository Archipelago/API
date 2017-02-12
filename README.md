# API
## Installation

```sh
npm install
cp config.json.default config.json
mysql -u root -p <<< 'CREATE DATABASE archipelago'
mysql -u root -p archipelago < db.sql
```

Note that it requires MariaDB 5.6.5 or superior.

To insert data in table `VideoReleases`, you will need to fill all the `List*` tables. A dataset is available to avoid filling it yourself:

```sh
mysql -u root -p archipelago < lists.sql
```

## Tests

```sh
npm test
```

To run tests, you need `nodeunit` (you can simply `npm install -g nodeunit` to get it) and to apply [this patch](https://github.com/caolan/nodeunit/pull/171).

## Documentation

To build the documentation, you need `apidoc` (you can simply `npm install -g apidoc` to get it) and to run the following command:

```sh
apidoc -i doc -o doc/out # build the doc
xdg-open doc/out/index.html # open the doc in your browser
```
