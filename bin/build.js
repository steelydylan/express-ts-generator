#! /usr/bin/env node
"use strict";

const builder = require('../src/index.js');

exports.builder = {
  d: {
    alias: 'dist',
    describe: 'set dist directory',
    default: '',
  },
  s: {
    alias: 'src',
    describe: 'set src directory',
    default: '',
  },
}

exports.handler = function (argv) {
  builder({
    src: argv.src,
    dist: argv.dist
  });
};