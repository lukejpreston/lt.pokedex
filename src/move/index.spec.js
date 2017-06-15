const matchJson = require('../../match-json')

matchJson('move', 'move', [1], 'move-1')
matchJson('move, with stat changes and machines', 'move', [14], 'move-14')
matchJson('move, with past values and effect changes', 'move', [16], 'move-16')
