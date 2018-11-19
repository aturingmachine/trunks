const trunks = require('../trunks')
const { second } = require('./second')

const ex = new trunks()

ex.warn('Hello from a trunks {} log!', 'warning')
ex.debug('Hello from a trunks {} log!', 'debug')
ex.log('test', 'Hello from a trunks {} log!', 'custom')
ex.info('Hello from a trunks {} log!', 'info')
ex.success('Hello from a trunks {} log!', 'success')
ex.error(new Error('Test error'), 'Hello from a trunks {} log!', 'error')
ex.info('Template variables mismatch {}')
second.test()
