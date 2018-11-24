

## json 数据排序
从小到大打排序，排序规则按照 charCode 大小排序，支持 字符串 && 数组 混排

```js
const sortJson = require('sort-json');
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
    }
};
sortJson(map);
```
返回结果：
```json
{
    "a": 1,
    "ddd": {
        "a": [
            "012",
            12,
            90,
            "dfs"
        ],
        "b": [
            {
                "a": 321,
                "c": 123
            }
        ],
        "s": 12
    },
    "e": 123
}
```

### Todo
- 数组 && 字符串 混排 的排序方式配置
- 整体排序配置，正序 or 倒序
