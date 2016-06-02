#!/usr/bin/env node

if (process.argv.length <= 2) {
  console.error('Usage: ' + process.argv[1] + ' option');
  process.exit(1);
}

let config = require('../config.json');

function parseOption(split, data) {
  if (split.length === 1)
    return data[split[0]];
  else {
    if (!data[split[0]])
      data[split[0]] = {};
    let name = split.shift();
    return parseOption(split, data[name]);
  }
}

let option = parseOption(process.argv[2].split('.'), config);
let output = typeof option === 'object' ? JSON.stringify(option) : option;
process.stdout.write(option + '');
