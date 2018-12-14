let add = function(a, b = 0) {
    let res = a + b;
    let temp = function(x) {
        return add(x, res);
    }
    temp.toString = function () {
        return res;
    }

    return temp;
}
let str = add(1)(2)(3);
console.log(str)
