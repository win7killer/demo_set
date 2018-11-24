var wb = wb || {
    Ver: 1.00,
    /**
     *判断浏览器
     *return:bolean
     */
    UA: {
        Ie: !!document.all,
        Ie6: !!document.all && !window.XMLHttpRequest,
        Ie7: !!document.all && /msie 7.0/gi.test(window.navigator.userAgent),
        Ie8: !!document.all && /msie 8.0/gi.test(window.navigator.userAgent),
        Ie9: !!document.all && /msie 9.0/gi.test(window.navigator.userAgent),
        Ie10: !!document.all && /msie 10.0/gi.test(window.navigator.userAgent),
        FF: /firefox/gi.test(window.navigator.userAgent),
        Opera: /opera/gi.test(window.navigator.userAgent),
        Chrom: /Chrom/gi.test(window.navigator.userAgent),
        Maxthon: /Maxthon/gi.test(window.navigator.userAgent)
    },
    /**
     * [获取非复合css样式]
     * @param  {[object]} obj  [要获取样式的原生obj]
     * @param  {[string]} attr [属性名]
     * @return {[string]}      [获取到的属性]
     */
    css: function (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    },
    /**
     * 运动函数
     * @param  {object}   obj  对象
     * @param  {json}   json  要运动的属性集合
     * @param  {Function} fn   回调函数
     * @return {null}
     */
    startMove: function (obj, json, fn) {
        clearInterval(obj.timer);
        var iCur = 0,
            iSpeed = 0;
        obj.timer = setInterval(function () {
            var iBtn = true;
            for (var attr in json) {
                if (attr == 'opacity') {
                    iCur = Math.round(wb.css(obj, attr) * 100);
                } else {
                    iCur = parseInt(wb.css(obj, attr));
                }
                iSpeed = (json[attr] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    iBtn = false;
                    if (attr == 'opacity') {
                        obj.style.opacity = (iCur + iSpeed) / 100;
                        obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    } else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                }
            }
            if (iBtn) {
                clearInterval(obj.timer);
                if (fn) {
                    fn(obj);
                };
            }
        }, 30);
    },
    /***** 判断是否为json对象 *******
     * @param obj: 对象（可以是jq取到对象）
     * @return :布尔值 是否是json对象
     */
    isJson: function (obj) {
        return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    },
    /***** 判断是否为数组对象 *******
     * @param obj: 对象
     * @return  是否是数组对象 true/false
     */
    isArr: function (obj) {
        return Object.prototype.toString.call(obj).toLowerCase() == "[object array]";
    },
    /***** 得到一个 0~iMax 的随机数 *******
     * @param iMax: 生成的最大值
     * @param iMin: 生成的最小值
     * @return 生成的随机数
     */
    getRandom: function (iMin, iMax) {
        return Math.round(Math.random() * (iMax - iMin)) + iMin;
    },
    /***** 得到一组不重复的随机数 *******
     * @param iMax: 生成的最大值（不包括在内）
     * @return arr: 随机数的数组
     */
    toRandom: function (iMax, iMin, iNum) {
        var json = {},
            arr = [];
        iMin = iMin || 0;
        while (arr.length < iNum) {
            var rnum = Math.round(Math.random() * (iMax - iMin)) + iMin;
            if (!json[rnum]) {
                json[rnum] = rnum;
                arr.push(rnum);
            }
        }
        return arr;
    },
    /***** 添加滚轮滚动事件 *******
     * @param obj: 对象
     * @param  fnBack: 回调函数（参数 ev：事件；dir:向上滚--true；向下滚--false）
     * @return 无
     */
    addScroll: function (obj, fnBack) {
        obj.onmousewheel = fnScroll;
        if (obj.addEventListener) {
            obj.addEventListener('DOMMouseScroll', fnScroll, false);
        }

        function fnScroll(ev) {
            ev = ev || window.event;
            var dir = true;
            if (ev.wheelDelta) {
                dir = ev.wheelDelta > 0 ? true : false;
            } else {
                dir = ev.detail < 0 ? true : false;
            }
            fnBack(ev, dir);
            if (ev.preventDefault) {
                ev.preventDefault();
            }
            return false;
        }
    },
    /***** AJAX函数 *******
     * @param opt: JSON { url; [data]; [dataType]; success<回调函数>}
     * @return 无
     */
    ajax: function (opt) {
        var oAjax = null;
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest();
        } else {
            oAjax = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var o = {
            method: 'get',
            url: '',
            data: '',
            dataType: 'text', //text, json
            success: function () {}
        };
        for (var attr in opt) {
            if (attr in o) {
                o[attr] = opt[attr];
            }
        }
        if (o.method == 'get') {
            o.url += o.data ? '?' + o.data + '&' + new Date().getTime() : '?' + new Date().getTime();
        }
        oAjax.open(o.method, o.url, true);
        if (o.method == 'get') {
            oAjax.send();
        } else {
            oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
            oAjax.send(o.data);
        }
        oAjax.onreadystatechange = function () {
            if (oAjax.readyState == 4) {
                if (oAjax.status == 200) {
                    var data = oAjax.responseText;
                    switch (o.dataType) {
                        case 'text':
                            break;
                        case 'json':
                            data = JSON.parse(data);
                            break;
                    }
                    typeof o.success === 'function' && o.success(data);
                }
            }
        };
    },
    /**
     * 随机获取16进制的颜色值//有待改进
     * @param  {[type]} min 最小数值
     * @param  {[type]} max 最大数值
     * @return {[type]}     [description]
     */
    randColor16: function (min, max) {
        min = (min && min.length === 3) ? parseInt(min + min, 16) : 0;
        max = (max && max.length === 3) ? parseInt(max + max, 16) : 56 * 256 * 256 - 1;
        return str = '#' + (wb.getRandom(min, max)).toString(16);
    },
    /**
     * 随机获取rgb()格式颜色
     * @param  {[type]} min最小数值
     * @param  {[type]} max 最大数值
     * @return {[type]}     [description]
     */
    randColorRGB: function (min, max) {
        min = min || 0;
        max = max || 255;
        return str = 'rgb(' + this.getRandom(min, max) + ',' + this.getRandom(min, max) + ',' + this.getRandom(min, max) + ')';
    },
    /****高位补零函数****
     * @param str: 要补0的字符串或数字
     * @return arr: 随机数的数组
     */
    addZero: function (str, num) {
        for (var i = 0, len = num - str.length; i < len; i++) {
            str = '0' + str;
        }
        return str;
    },
    /****数组相减****
     * @param arr1: 被减数数组
     * @param arr2: 减数数组
     * @return arr: arr1-arr2
     */
    cutTowArr: function (arr1, arr2) {
        for (var i = 0, l = arr1.length; i < l; i++) {
            for (var j = 0, len = arr2.length; j < len; j++) {
                if (arr1[i] == arr2[j]) {
                    arr1.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        return arr1;
    },
    /****数组取交集****
     * @param arr1: 数组
     * @param arr2: 数组
     * @return arr: arr1 和arr2的交集
     */
    getArrShare: function (arr1, arr2) {
        var arr = [];
        for (var i = 0, l = arr1.length; i < l; i++) {
            for (var j = 0, len = arr2.length; j < len; j++) {
                if (arr1[i] == arr2[j]) {
                    arr.push(arr1[i]);
                }
            }
        }
        return arr;
    },

    /****数组穿插相加****
     * @param arr1: 数组
     * @param arr2: 数组
     * @return arr: arr1 和arr2的穿插生成新数组
     */
    mixArr: function (arr1, arr2) {
        var arr = [],
            l = arr1.length > arr2.length ? arr1.length : arr2.length;
        for (var i = 0; i < l; i++) {
            if (arr1[i]) {
                arr.push(arr1[i]);
            }
            if (arr2[i]) {
                arr.push(arr2[i]);
            }
        }
        return arr;
    },
    /**
     * 函数名：addArr
     * 参数1：arr1 :要合并的第一个数组
     * 参数2：arr2 :要合并的第二个数组
     * return：arr ：arr1+arr2 生成的新数组,不污染源数组
     */
    /*addArr:function(arr1,arr2){
    	var arr=[];
    	for(var i=0, l=arr1.length; i<l; i++){	arr.push(arr1[i]);	}
    	for(var i=0, l=arr2.length; i<l; i++){	arr.push(arr2[i]);	}
    	return arr;
    },*/
    setOpos: function (obj) {
        var rx = obj.offsetWidth / 2,
            ry = obj.offsetHeight / 2;
        obj.o = {
            x: obj.offsetLeft + rx,
            y: obj.offsetTop + ry
        };
    },
    /**
     * [colorRgb description]
     * @param  {[type]} sColor [description]
     * @return {[type]}        [description]
     */
    colorRgb: function (sColor) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var j = 1; j < 7; j += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(j, j + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    },
    /**
     * [colorHex description]
     * @param  {[type]} rgb [description]
     * @return {[type]}     [description]
     */
    colorHex: function (rgb) {
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);

                hex = hex.length != 2 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            var aNum = _this.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var j = 0; j < aNum.length; j += 1) {
                    numHex += (aNum[j] + aNum[j]);
                }
                return numHex;
            }
        } else {
            return _this;
        }
    },
    /**
     * wb选择器
     * @param  {string} str     要获取的  id  |  className  |  标签名
     * @param  { string  |  object } parArea  可选参数，上下文
     * @return {object}         选择到的DOM对象
     */
    _$: function (str, parArea) {
        var oSel = {
            id: /^\#[A-Za-z]\w*$/,
            cName: /^\.[A-Za-z]\w*$/,
            tName: /^[A-Za-z]\w*$/,
            creatTag: /^\<[A-Za-z]+\>$/,
            all: /^\*$/
        };
        str = str.trim ? (str.trim() || '*') : str;
        //if(str !== '*'){
        parArea = parArea || document;
        parArea = (typeof parArea).toLowerCase() === 'object' ? parArea : document.getElementById(parArea.replace(/\#/, ''));
        //}
        if (oSel.id.test(str)) {
            return document.getElementById(str.replace(/\#/, ''));
        } else if (oSel.cName.test(str)) {
            var arr = [],
                aAll = null;
            str = str.replace(/\./, '');
            if (document.getElementsByClassName) {
                aAll = parArea.getElementsByClassName(str);
                for (var i = 0, l = aAll.length; i < l; i++) {
                    arr.push(aAll[i]);
                }
            } else { /*有待改进*/
                aAll = parArea.getElementsByTagName('*');
                for (var i = 0, l = aAll.length; i < l; i++) {
                    var aClass = aAll[i].className.split(' ');
                    for (var j = 0; j < aClass.length; j++) {
                        if (aClass[j] == str) {
                            arr.push(aAll[i]);
                            break;
                        }
                    }
                }
            }
            return arr;
        } else if (oSel.tName.test(str)) {
            return parArea.getElementsByTagName(str);
        } else if (oSel.creatTag.test(str)) {
            return document.createElement(str);
        } else if (oSel.all.test(str)) {
            return parArea.getElementsByTagName('*');
        } else {
            console.error('%c 参数不正确', 'color:#f60; font-size:20px');
            return false;
        }
    },
    outer: function (obj) {
        var o = {};
        o.width = obj.offsetWidth;
        o.height = obj.offsetHeight;
        o.left = obj.offsetLeft;
        o.top = obj.offsetTop;
        return o;
    },
    /****** 设置cookie *******
     * @param key:cookie名
     * @param value:cookie值
     * @param t:cookie存储时间
     * @return 无
     */
    setCookie: function (key, value, t) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + t);
        document.cookie = encodeURI(key) + '=' + encodeURI(value) + ';expires=' + oDate.toUTCString();
        if (getCookie(key)) {
            return true;
        }
        return false;
    },
    /***** 获取cookie *******
     * @param key:cookie名
     * @return 对应的value
     */
    getCookie: function (key) {
        var arr1 = document.cookie.split('; ');
        for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split('=');
            if (arr2[0] == encodeURI(key)) {
                return decodeURI(arr2[1]);
            }
        }
    },
    /***** 删除cookie *******
     * @param key:cookie名
     * @return 无
     */
    delCookie: function (key) {
        setCookie(key, '', -1);
    },
    //删除指定class函数
    removeClass: function (obj, sClass) {
        var aClass = obj.className.split(' ');
        if (!aClass[0]) return false;
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] == sClass) {
                aClass.splice(i, 1);
                obj.className = aClass.join(' ');
                return false;
            }
        }
    },
    //添加指定class函数
    addClass: function (obj, sClass) {
        var aClass = obj.className.split(' ');
        if (!aClass[0]) {
            obj.className += ' ' + sClass;
            return false;
        }
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] == sClass) return false;
        }
        obj.className += ' ' + sClass;
    },
    //判断是否有指定class封装函数
    hasClass: function (obj, sClass) {
        var aClass = obj.className.split(' ');
        if (!aClass[0]) return false;
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] == sClass) return true;
        }
        return false;
    },

    /***** 用className获取元素 *******
     * @param sClass:要获取的className
     * @return parent:查找范围
     */
    getByClass: function (sClass, parent) {
        var aEles = (parent || document).getElementsByTagName('*'),
            arr = [];
        for (var i = 0, l = aEles.length; i < l; i++) {
            var aClass = aEles[i].className.split(' ');
            for (var j = 0; j < aClass.length; j++) {
                if (aClass[j] == sClass) {
                    arr.push(aEles[i]);
                    break;
                }
            }
        }
        return arr;
    }
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};
String.prototype.encode = function () {
    return encodeURIComponent(encodeURIComponent(this));
};
/****数组去重****
 * @param str: 要补0的字符串或数字
 * @return arr: 随机数的数组
 */
Array.prototype.delReElement = Array.prototype.delReElement || function () {
    var json = {},
        arr = [];
    for (var i = 0, l = this.length; i < l; i++) {
        if (!json[this[i]]) {
            arr.push(this[i]);
            json[this[i]] = [this[i]];
        }
    }
    return arr;
}
/**
 * 数组去除空元素
 * return: arr 操作后的数组
 */
Array.prototype.arrDelSpace = Array.prototype.arrDelSpace || function (arr) {
    for (var i = 0, len = arr.length; i < len;) {
        if (/^\s*$/.test(arr[i])) {
            arr.splice(i, 1);
        } else {
            i++;
        }
    }
    return arr;
}

/**
 * 单条点击滚动
 * @param {string} id     外层id
 * @param {string} sUl    要移动的ul的className
 * @param {string} lId   左按钮id
 * @param {string} rId    右按钮id
 * @param {[type]} [option] 参数集合 可选 {
 * 		dir : string    方向  默认 ‘left’,
 * 		moveSize ： number  每次移动距离
 * }
 */
function PicMove(id, sUl, lId, rId, option) {
    var _this = this;
    this.oUl = wb._$(sUl);
    this.oWarp = wb._$(id);
    this.oLeft = wb._$(lId);
    this.oRight = wb._$(rId);
    this.lock = false;
    option = option || {};
    this.option = this.init(option) || option;
    this.oLeft.onclick = function () {
        _this.run('left');
    }
    this.oRight.onclick = function () {
        _this.run('right');
    }
}
PicMove.prototype.init = function (o) {
    o.dir = o.dir || 'left';
    o.moveSize = o.moveSize || wb.outer(this.oUl.children[0]).width || 50;
    return o;
}
PicMove.prototype.run = function (dir) {
    var _this = this,
        iLeft;
    if (this.lock) {
        return false;
    }
    this.lock = true;
    iLeft = parseInt(wb.css(this.oUl, 'left'));
    if (dir == 'left' && iLeft >= 0) {
        iLeft = 0;
    } else if (dir == 'right' && iLeft <= (wb.outer(this.oUl.parentNode).width - wb.outer(this.oUl).width)) {
        iLeft = wb.outer(this.oUl.parentNode).width - wb.outer(this.oUl).width;
    } else {
        iLeft += (dir == 'left' ? this.option.moveSize : -this.option.moveSize);
    }
    wb.startMove(this.oUl, {
        'left': iLeft
    }, function () {
        _this.lock = false;
    });
}
