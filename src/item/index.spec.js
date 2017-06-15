const matchJson = require('../../match-json')

matchJson('item', 'item', [1], 'item-1')
matchJson('item, with fling effect', 'item', [213], 'item-213')
matchJson('item, with held items', 'item', [222], 'item-222')
matchJson('item, with baby trigger for', 'item', [231], 'item-231')
matchJson('item, with machines', 'item', [397], 'item-397')
