# Trunks

trunks is a simple logger for NodeJS projects. It writes to stdout. I wrote trunks because I couldn't find a lightweight logger that did the bare minimum.

## Usage

`trunks(<log-level>, <message>, <err>)`

`log-level` is the level at which you want the log displayed at, trunks supports 4 predefined levels
 - `success`
 - `info`
 - `warn`
 - `error`

These levels simply outut the level info in a different color, and make life simpler when parsing logs.

You can also pass in a custom `log-level` that will be output as `\x1b[35m` Magenta to stdout.

`message` is just a string that you want logged

`err` is an error object, this defaults to null. If passed the stack will be printed by trunks to stdout

## Installation

```bash
npm install --save trunks-log
```

## Example

```js
const { trunks } = require('trunks-log')

trunks('info', 'Hello From Trunks!')
```

Will produce:

![trunks example](https://github.com/aturingmachine/trunks/blob/master/examples/trunksExample.png)

## Contributing

Please feel free to contribute to this project!

### Notes

trunks will pad your info line out to 17 total characters, this way all your logging info remains in a straight line for levels of differing lengths!