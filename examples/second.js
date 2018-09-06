const trunks = require('../trunks')

exports.second = {
  test: () => {
    const logger = new trunks('secondjs', 'blue')

    logger.warn('Testing from Second')
    logger.error(new Error('Secondjs error'), 'testing level is set to instance')
  }
}