const colors = {
  "reset": "\x1b[0m",
  "bold": "\x1b[1m",
  "Red": "\x1b[31m",
  "Green": "\x1b[32m",
  "Yellow": "\x1b[33m",
  "Blue": "\x1b[34m",
  "Magenta": "\x1b[35m",
  "Cyan": "\x1b[36m",
  "White": "\x1b[37m"
}

let padNum = 17
let defaultColor = colors.Magenta

exports.trunks = (logLevel, message, err = null) => {
  let date = new Date()
  let timestamp =  date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() + 
  "::" + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()

  let padding = " ".repeat(padNum - logLevel.length)
  let levelColor = defaultColor

  switch (logLevel) {
    case 'error':
      levelColor = colors.Red
      break
    case 'success': 
      levelColor = colors.Green
      break
    case 'info':
      levelColor = colors.Cyan
      break
    case 'warn':
      levelColor = colors.Yellow
      break
  }

    console.log(`${colors.Blue} ${timestamp} ${colors.reset}` + 
    `${colors.bold + levelColor} [${logLevel}]${padding}` +
    `${colors.reset + colors.White} ${message} ${colors.reset}`)

  if (err) {
    console.log(`${colors.Red}`)
    console.log(err.stack)
    console.log(`${colors.reset}`)
  }
}