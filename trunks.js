const colors = {
  "reset": "\x1b[0m",
  "bold": "\x1b[1m",
  "Red": "\x1b[31m",
  "Green": "\x1b[32m",
  "Yellow": "\x1b[33m",
  "Blue": "\x1b[34m",
  "Magenta": "\x1b[35m",
  "Cyan": "\x1b[36m",
}
let levels = ['PROD', 'DEBUG']

genTimestamp = () => {
  let date = new Date()
  let timestamp = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() +
    "::" + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()

  return '[' + timestamp + ']' + colors.reset
}

genPaddingString = (logLevel) => {
  return " ".repeat(17 - logLevel.length) + colors.reset
}

buildPrintString = (template, args) => {
  if (args.length != (template.match(/{}/g) || []).length) {
    this.trunks.log('trunks-error', 'Replacement templates (open-close curly braces) must match number of provided arguments, error occurred on template: ' + template)
    return null
  }

  while ((template.match(/{}/g) || []).length) {
    let replacementArg = args.shift()
    if (replacementArg instanceof Object) {
      replacementArg = JSON.stringify(replacementArg)
    }
    template = template.replace('{}', replacementArg)
  }

  return template + colors.reset
}

exports.trunks = {

  thresholdLevel: 'DEBUG',

  log: (level, message, ...args) => {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.Blue} ${genTimestamp()}` +
        `${colors.bold + colors.Magenta} [${level.toUpperCase()}]${genPaddingString(level)}` +
        ` ${logMessage}`)
    }
  },

  warn: (message, ...args) => {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.Blue} ${genTimestamp()}` +
        `${colors.bold + colors.Yellow} [WARN]${genPaddingString('warn')}` +
        ` ${logMessage}`)
    }
  },

  info: (message, ...args) => {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.Blue} ${genTimestamp()}` +
        `${colors.bold + colors.Cyan} [INFO]${genPaddingString('info')}` +
        ` ${logMessage}`)
    }
  },

  success: (message, ...args) => {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.Blue} ${genTimestamp()}` +
        `${colors.bold + colors.Green} [SUCCESS]${genPaddingString('success')}` +
        ` ${logMessage}`)
    }
  },

  debug: (message, ...args) => {
    if (this.trunks.thresholdLevel !== 'PROD') {
      let logMessage = buildPrintString(message, args)
      if (logMessage) {
        console.log(`${colors.Blue} ${genTimestamp()}` +
          `${colors.bold + colors.Yellow} [DEBUG]${genPaddingString('debug')}` +
          ` ${logMessage}`)
      }
    }
  },

  error: (err, message, ...args) => {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {

      console.log(`${colors.Blue} ${genTimestamp()}` +
        `${colors.bold + colors.Red} [ERROR]${genPaddingString('error')}` +
        ` ${logMessage}`)

      if (err && this.trunks.thresholdLevel != 'PROD') {
        console.log(colors.Red + err.stack + colors.reset)
      }
    }
  },

  setLevel: (newLevel) => {
    if (!levels.includes(newLevel)) {
      this.trunks.log('trunks-error', 'Desired Logging Level: {} is not supported', newLevel)
      return
    }
    this.trunks.thresholdLevel = newLevel
  },
}