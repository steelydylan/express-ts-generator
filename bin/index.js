#! /usr/bin/env node
"use strict";

require('yargs')
  .command('*', 'the serve command', require('./build.js'))
	.command('build','build ts files from open api',require('./build.js'))
  .alias('v', 'version')
  .version(require('../package').version)
  .describe('v', 'show version information')
  .detectLocale(false)
  .alias('h', 'help')
  .strict()
  .argv