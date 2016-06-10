# API
## Installation

```sh
npm install
cp config.json.default config.json
```

You also need to install the [database](https://github.com/Archipelago/Database).

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
