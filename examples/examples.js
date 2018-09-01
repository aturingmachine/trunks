const { trunks } = require('../trunks')

trunks.success('Hello from a {} success {}!', 'trunks', 'log')
trunks.info('Hello from a {} info {}!', 'trunks', 'log')
trunks.debug('Hello from a {} debug {}!', 'trunks', 'log')
trunks.warn('Hello from a {} warning {}!', 'trunks', 'log')
trunks.log('custom level', 'Hello from a {} custom level {}!', 'trunks', 'log')
trunks.info('Wrong number of matchers', 'test')
trunks.error(new Error('Example Error'), 'Hello from a {} error {}!', 'trunks', 'log')