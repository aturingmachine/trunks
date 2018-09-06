const colors = {
  "reset": "\x1b[0m",
  "bold": "\x1b[1m",
  "RED": "\x1b[31m",
  "GREEN": "\x1b[32m",
  "YELLOW": "\x1b[33m",
  "BLUE": "\x1b[34m",
  "MAGENTA": "\x1b[35m",
  "CYAN": "\x1b[36m",
}
let levels = ['PROD', 'DEBUG']

genTimestamp = () => {
  let date = new Date()
  let timestamp = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() +
    "::" + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()

  return '[' + timestamp + ']' + colors.reset
}

genPaddingString = (logLevel, pad) => {
  return " ".repeat(pad - logLevel.length) + colors.reset
}

buildPrintString = (template, args) => {
  //need to fix this check
  if (args.length != (template.match(/{}/g) || []).length) {
    const me = new trunks('TRUNKS', 'red', 'DEBUG')
    me.error(new Error('trunks replacement count mismatch on template: ' + template), 'Replacement templates (open-close curly braces) must match number of provided arguments')
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

buildNamespaceString = (namespace, color) => {
  return color + '[' + namespace + ']' + colors.reset
}

buildLevelString = (level, color) => {
  return ` ${colors.bold + color}[${level.toUpperCase()}]${colors.reset}`
}

getNamespaceColor = (passedColor) => {
  switch (passedColor.toUpperCase()) {
    case 'YELLOW':
      return colors.YELLOW
    case 'RED':
      return colors.RED
    case 'BLUE':
      return colors.BLUE
    case 'GREEN':
      return colors.GREEN
    default:
      return colors.MAGENTA
  }
}

class trunks {
  constructor(initNamespace = 'APP', namespaceColor = 'magenta', level = 'DEBUG') {
    this.thresholdLevel = levels.includes(level.toUpperCase()) ? level.toUpperCase() : 'DEBUG'
    this.namespace = initNamespace
    this.namespaceColor = colors.bold + (colors[namespaceColor.toUpperCase()] == undefined ? colors.YELLOW : colors[namespaceColor.toUpperCase()])
  }

  debug(message, ...args) {
    if (this.thresholdLevel !== 'PROD') {
      let logMessage = buildPrintString(message, args)
      if (logMessage) {
        console.log(`${colors.BLUE} ${genTimestamp()} ` +
          `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
          `${buildLevelString('debug', colors.YELLOW)}${genPaddingString('debug', 10)}` +
          ` ${logMessage}`)
      }
    }
  }

  log(level, message, ...args) {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString(level, colors.MAGENTA)}${genPaddingString(level, 10)}` +
        ` ${logMessage}`)
    }
  }

  warn(message, ...args) {
    // console.log('NAMESPACE ON WARN: ' + this.namespace)
    // console.log()
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('warn', colors.YELLOW)}${genPaddingString('warn', 10)}` +
        ` ${logMessage}`)
    }
  }

  info(message, ...args) {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('info', colors.CYAN)}${genPaddingString('info', 10)}` +
        ` ${logMessage}`)
    }
  }

  success(message, ...args) {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('success', colors.GREEN)}${genPaddingString('success', 10)}` +
        ` ${logMessage}`)
    }
  }

  error(err, message, ...args) {
    let logMessage = buildPrintString(message, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('error', colors.RED)}${genPaddingString('error', 10)}` +
        ` ${logMessage}`)

      if (err && this.thresholdLevel != 'PROD') {
        console.log(colors.RED + err.stack + colors.reset)
      }
    }
  }
}

module.exports = trunks;