function sortJson(json = {}) {
    let str = ['{'];
    let keys = Object.keys(json);
    keys.sort((a, b) => {
        return keySort(a, b);
    });
    keys.forEach((key, index) => {
        let keyCont = json[key];
        keyCont = goByInstanceof(keyCont);
        let temp = `"${key}": ${JSON.stringify(keyCont)}`;
        if (index < keys.length - 1) {
            temp += ',';
        }
        str.push(temp);
    });
    str.push('}')
    let res = str.join('\n');
    return JSON.parse(res);
}

function sortArray(arr = []) {
    arr.forEach((item, index) => {
        arr[index] = goByInstanceof(item);
    });
    arr = arr.sort((a, b) => {
        if (a instanceof Object) {
            return 1;
        } else {
            return keySort(a, b);
        }
    });
    return arr;
}

function keySort(a, b) {
    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
        return a - b;
    } else {
        for (let i = 0, l = a.length; i < l; i++) {
            if (b.toString().charCodeAt(i)) {
                let diff = a.toString().charCodeAt(i) - b.toString().charCodeAt(i);
                if (diff !== 0) {
                    return diff;
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
}

function goByInstanceof(cont) {
    if (cont instanceof Array) {
        cont = sortArray(cont);
    } else if (cont instanceof Object) {
        cont = sortJson(cont);
    }
    return cont;
}

let init = goByInstanceof;
// let map = {
//     e: 123,
//     a: 1,
//     ddd: {
//         s: 12,
//         b: [{
//             c: 123,
//             a: 321
//         }],
//         a: [90, 12, 'dfs', '012']
//     }
// };
// console.log(JSON.stringify(init(map), null, 4))
module.exports = init;
