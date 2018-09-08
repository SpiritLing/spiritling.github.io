## webpack 引入第三方库

### 安装

```shell
cnpm install jquery -S
```

### 使用

在webpack 3.x 中需要大量配置，但是在webpack中则少了很多

```js
const $ = require("jquery");

$("body").html("<p>我是由JQuery写出来的</p>")
```
