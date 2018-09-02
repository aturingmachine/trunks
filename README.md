# Trunks
[![npm version](https://badge.fury.io/js/trunks-log.svg)](https://badge.fury.io/js/trunks-log)

trunks is a simple logger for NodeJS projects. It writes to stdout. I wrote trunks because I couldn't find a lightweight logger that did the bare minimum.

## Usage

trunks has 5 built in logging levels, `debug, info, success, warn, error` with predefined coloring in their output to make them easier to spot in a slew of logs.

 - `debug` prints in yellow
 - `warn` prints in yellow
 - `info` prints in cyan
 - `success` prints in green
 - `error` prints in red (including a passed error's stacktrace)

 You can also use the generic `trunks.log()` function to print a log with a custom tag in it, this will be printed in magenta.

 trunks supports variable replacement, meaning we can pass a template and a list of args to the functions to format the string.

 `trunks.info('Hello from {}!', 'trunks')`

 Will output: 
 `Hello from trunks!` in the message section of the log.

 trunks also supports passing objects into the template, they will be output as the result of a `JSON.stringify()` call.

### Logging Levels

trunks currently supports 2 logging levels, `PROD` and `DEBUG`. 

> Any more ideas for further support of logging levels is greatly appreciated

- `DEBUG` will log everything
- `PROD` will *NOT* log `debug`, or the stacktrace from `error` calls. (This is open to change)

Setting the level to prod should not effect performance as the level check occurs prior to the building of the template.

## Installation

```bash
npm install --save trunks-log
```

## Example

```js
const { trunks } = require('../trunks')

trunks.success('Hello from a {} success {}!', 'trunks', 'log')
trunks.info('Hello from a {} info {}!', 'trunks', 'log')
trunks.debug('Hello from a {} debug {}!', 'trunks', 'log')
trunks.warn('Hello from a {} warning {}!', 'trunks', 'log')
trunks.log('custom level', 'Hello from a {} custom level {}!', 'trunks', 'log')
trunks.error(new Error('Example Error'), 'Hello from a {} error {}!', 'trunks', 'log')
```

Will produce:

![trunks example](https://raw.githubusercontent.com/aturingmachine/trunks/master/examples/trunksExample.png)

## Contributing

Please feel free to contribute to this project! I am open to any and all suggestions. Simply fork it and make a pr and we can discuss the changes there!

### Notes

trunks will pad your info line out to 17 total characters, this way all your logging info remains in a straight line for levels of differing lengths!