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
  let timestamp ='[' + (date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate())
   + "/" + (date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth()) + "/" + date.getUTCFullYear()
   + "::" + (date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours())
   + ":" + (date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()) 
   + ":" + (date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()) + ']'

  return timestamp + genPaddingString(timestamp, 20)
}

genPaddingString = (logLevel, pad) => {
  if (pad - logLevel.length > 0 ) {
    return " ".repeat(pad - logLevel.length) + colors.reset
  } else {
    return " " + colors.reset
  }
}

buildPrintString = (template, args) => {
  //need to fix this check
  if (args.length != (template.match(/{}/g) || []).length) {
    const me = new trunks('TRUNKS-LOG', 'red', 'DEBUG')
    me.error(new Error('trunks replacement count mismatch on template: "' + template.substring(0, 25) + '..."'),
     'Replacement templates "{ }" must match number of provided arguments')
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
//22
class trunks {
  /**
   * Constructor
   * 
   * @param {string=} [initNamespace="APP"] - The namespace for the instance of the logger
   * @param {string=} [namespaceColor="magenta"] - Color for the namespace print | `['yellow', 'red', 'blue', 'green']`
   * @param {string=} [level="DEBUG"] - The logging level that the instance should run at | `['DEBUG', 'PROD']`
   */
  constructor(initNamespace = 'APP', namespaceColor = 'magenta', thresholdLevel = 'DEBUG') {
    this.thresholdLevel = levels.includes(thresholdLevel.toUpperCase()) ? thresholdLevel.toUpperCase() : 'DEBUG'
    this.namespace = initNamespace.length > 0 ? initNamespace : 'APP'
    this.namespaceColor = colors.bold + (colors[namespaceColor.toUpperCase()] == undefined ? colors.YELLOW : colors[namespaceColor.toUpperCase()])
  }

  /**
   * 
   * @param {string} template - The template that should be run. Variables can be noted using `{}`
   * @param  {...string} args - Values to replace instances of `{}` in `template`. All variables passed after the template will be considered variables.
   */
  debug(template, ...args) {
    if (this.thresholdLevel !== 'PROD') {
      let logMessage = buildPrintString(template, args)
      if (logMessage) {
        console.log(`${colors.BLUE} ${genTimestamp()} ` +
          `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
          `${buildLevelString('debug', colors.YELLOW)}${genPaddingString('debug', 10)}` +
          ` ${logMessage}`)
      }
    }
  }

  /**
   * 
   * @param {string} level - A custom level
   * @param {string} template - The template that should be run. Variables can be noted using `{}`
   * @param  {...string} args - Values to replace instances of `{}` in `template`. All variables passed after the template will be considered variables.
   */
  log(level, template, ...args) {
    let logMessage = buildPrintString(template, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString(level, colors.MAGENTA)}${genPaddingString(level, 10)}` +
        ` ${logMessage}`)
    }
  }

  /**
   * 
   * @param {string} template - The template that should be run. Variables can be noted using `{}`
   * @param  {...string} args - Values to replace instances of `{}` in `template`. All variables passed after the template will be considered variables.
   */
  warn(template, ...args) {
    // console.log('NAMESPACE ON WARN: ' + this.namespace)
    // console.log()
    let logMessage = buildPrintString(template, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('warn', colors.YELLOW)}${genPaddingString('warn', 10)}` +
        ` ${logMessage}`)
    }
  }

  /**
   * 
   * @param {string} template - The template that should be run. Variables can be noted using `{}`
   * @param  {...string} args - Values to replace instances of `{}` in `template`. All variables passed after the template will be considered variables.
   */
  info(template, ...args) {
    let logMessage = buildPrintString(template, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('info', colors.CYAN)}${genPaddingString('info', 10)}` +
        ` ${logMessage}`)
    }
  }

  /**
   * 
   * @param {string} template - The template that should be run. Variables can be noted using `{}`
   * @param  {...string} args - Values to replace instances of `{}` in `template`. All variables passed after the template will be considered variables.
   */
  success(template, ...args) {
    let logMessage = buildPrintString(template, args)
    if (logMessage) {
      console.log(`${colors.BLUE} ${genTimestamp()} ` +
        `${buildNamespaceString(this.namespace, this.namespaceColor)}${genPaddingString(this.namespace, 10)}` +
        `${buildLevelString('success', colors.GREEN)}${genPaddingString('success', 10)}` +
        ` ${logMessage}`)
    }
  }

  /**
   * 
   * @param {Error=} [err] - An error to pass to the function. If no error is needed simply pass `null`
   * @param {string} template - The template that should be run. Variables can be noted using `{}`
   * @param  {...string} args - Values to replace instances of `{}` in `template`. All variables passed after the template will be considered variables.
   */
  error(err, template, ...args) {
    let logMessage = buildPrintString(template, args)
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