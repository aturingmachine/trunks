const colors = {
  "reset": "\x1b[0m",
  "bold": "\x1b[1m",
  "Red": "\x1b[31m",
  "Green": "\x1b[32m",
  "Yellow": "\x1b[33m",
  "Blue": "\x1b[34m",
  "Magenta": "\x1b[35m",
  "Cyan": "\x1b[36m",
  "White": "\x1b[37m",
}

genTimestamp = () => {
  let date = new Date()
  let timestamp = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() +
      "::" + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()

  return timestamp
}

genPaddingString = (logLevel) => {
  return " ".repeat(17 - logLevel.length)
}

buildPrintString = (template, args) => {
  if (args.length != (template.match(/{}/g)||[]).length) {
    this.trunks.log('trunks-error', 'Replacement templates (open-close curly braces) must match number of provided arguments')
  }

  while ((template.match(/{}/g)||[]).length) {
    template = template.replace('{}', args.shift())
  }

  return template
}

exports.trunks = {

  log: (level, message, ...args) => {
    console.log(`${colors.Blue} ${genTimestamp()} ${colors.reset}` +
      `${colors.bold + colors.Magenta} [${level.toUpperCase()}]${genPaddingString(level)}` +
      `${colors.reset + colors.White} ${buildPrintString(message, args)} ${colors.reset}`)
  },

  warn: (message, ...args) => {
    console.log(`${colors.Blue} ${genTimestamp()} ${colors.reset}` +
      `${colors.bold + colors.Yellow} [WARN]${genPaddingString('warn')}` +
      `${colors.reset + colors.White} ${buildPrintString(message, args)} ${colors.reset}`)
  },

  info: (message, ...args) => {
    console.log(`${colors.Blue} ${genTimestamp()} ${colors.reset}` +
      `${colors.bold + colors.Cyan} [INFO]${genPaddingString('info')}` +
      `${colors.reset + colors.White} ${buildPrintString(message, args)} ${colors.reset}`)
  },

  success: (message, ...args) => {
    console.log(`${colors.Blue} ${genTimestamp()} ${colors.reset}` +
      `${colors.bold + colors.Green} [SUCCESS]${genPaddingString('success')}` +
      `${colors.reset + colors.White} ${buildPrintString(message, args)} ${colors.reset}`)
  },

  debug: (message, ...args) => {
    console.log(`${colors.Blue} ${genTimestamp()} ${colors.reset}` +
      `${colors.bold + colors.Yellow} [DEBUG]${genPaddingString('debug')}` +
      `${colors.reset + colors.White} ${buildPrintString(message, args)} ${colors.reset}`)
  },

  error: (err, message, ...args) => {

    console.log(`${colors.Blue} ${genTimestamp()} ${colors.reset}` +
      `${colors.bold + colors.Red} [ERROR]${genPaddingString('error')}` +
      `${colors.reset + colors.White} ${buildPrintString(message, args)} ${colors.reset}`)

    if (err) {
      console.log(`${colors.Red}`)
      console.log(err.stack)
      console.log(`${colors.reset}`)
    }
  },
}