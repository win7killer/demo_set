const sort = require('./index.js');

let map = {
    e: 123,
    a: 1,
    ddd: {
        s: 12,
        b: [{
            c: 123,
            a: 321
        }],
        a: [90, 12, 'dfs', '012']
    },
    123: {
        '23d': 'sss'
    },
    23: 123,
    127: 12
};

let res = sort(map);

console.log(JSON.stringify(res, null, 4));
