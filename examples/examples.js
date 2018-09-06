const trunks = require('../trunks')
const { second } = require('./second')

const ex = new trunks()

// ex.warn('Testing from main')
// ex.debug('Testing debug')
// ex.log('Test', 'Hello from a {}', 'test')
// ex.info('testing info boi')
// ex.success('Testing success')
// ex.error(new Error('Test error'), 'Testing error message {} ', 'and a var')
// ex.info('Trying to throw an error {}')
// second.test()

ex.warn('Hello from a trunks {} log!', 'warning')
ex.debug('Hello from a trunks {} log!', 'debug')
ex.log('test', 'Hello from a trunks {} log!', 'custom')
ex.info('Hello from a trunks {} log!', 'info')
ex.success('Hello from a trunks {} log!', 'success')
ex.error(new Error('Test error'), 'Hello from a trunks {} log!', 'error')