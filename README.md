# Trunks
[![npm version](https://badge.fury.io/js/trunks-log.svg)](https://badge.fury.io/js/trunks-log)

trunks is a simple logger for NodeJS projects. It writes to stdout. I wrote trunks because I couldn't find a lightweight logger that did the bare minimum.

## Installation

```bash
npm install --save trunks-log
```


## Usage

trunks has 5 built in logging levels, `debug, info, success, warn, error` with predefined coloring in their output to make them easier to spot in a slew of logs.

 - `debug` prints in yellow
 - `warn` prints in yellow
 - `info` prints in cyan
 - `success` prints in green
 - `error` prints in red (including a passed error's stacktrace)

 You can also use the generic `log()` function to print a log with a custom tag in it, this will be printed in magenta.

 trunks supports variable replacement, meaning we can pass a template and a list of args to the functions to format the string.

 `trunks.info('Hello from {}!', 'trunks')`

 Will output: 
 `Hello from trunks!` in the message section of the log.

 trunks also supports passing objects into the template, they will be output as the result of a `JSON.stringify()` call.

### Logging Levels

trunks currently supports 2 logging levels, `PROD` and `DEBUG`. 

> Any more ideas for further support of logging levels is greatly appreciated

- `DEBUG` will log everything
- `PROD` will *NOT* log `debug` level logs, or the stacktrace from `error` calls. (This is open to change)

Setting the level to prod should not effect performance as the level check occurs prior to the building of the template.

### Instances

As of V2.0.0 trunks now supports the ability to namespace an instance of trunks via the constructor. This will change the second section of output in the console. The constructor is as follows:

```
trunks (
  namespace = 'APP',
  namespaceColor = 'magenta',
  level = 'DEBUG'
)
```

The trunks instance will default to a `DEBUG` logging level with the namespace `APP` and print the namespace in the color `MAGENTA` (as determined by your terminal).

- `namespace` can be any string
- `namespaceColor` must be one of: `['yellow', 'red', 'blue', 'green']`, with the default as `magenta`
- `level` must be one of `['debug', 'prod']`

## Example

```js
const trunks = require('../trunks')

const ex = new trunks()

ex.warn('Hello from a trunks {} log!', 'warning')
ex.debug('Hello from a trunks {} log!', 'debug')
ex.log('test', 'Hello from a trunks {} log!', 'custom')
ex.info('Hello from a trunks {} log!', 'info')
ex.success('Hello from a trunks {} log!', 'success')
ex.error(new Error('Test error'), 'Hello from a trunks {} log!', 'error')
```

Will produce:

![trunks example](https://raw.githubusercontent.com/aturingmachine/trunks/master/examples/trunksExample.png)

## Contributing

Please feel free to contribute to this project! I am open to any and all suggestions. Simply fork it and make a pr and we can discuss the changes there!

## Roadmap
In the future versions of trunks I would like to add:
- support for use in browsers