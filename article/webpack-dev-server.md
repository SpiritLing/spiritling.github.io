## webpack-dev-server

本地服务器

### 安装

```shell
npm install webpack-dev-server -S
```

### 基本概念

可以构建一个本地服务器进行启动测试

### 配置webpack.config.js

webpack.config.js

```js
devServer: {
    contentBase: path.join(__dirname, "/dist"),  //启动路径
    port: 9001,  // 端口号
    hot: true,  // 热更新
    inline:true  // 内联模式
}
```

当然在使用上面 `hot` 热更新时需要开启一个插件 `HotModuleReplacementPlugin` 此插件属于内置插件，可以直接使用 `new webpack.HotModuleReplacementPlugin()` 来进行启用

以上使 `webpack-dev-server` 的基本参数用法，具体的可以查看[此处](https://www.webpackjs.com/configuration/dev-server/)

### 配置package.json

```js
"scripts": {
    "start": "webpack-dev-server --open"
}
```

使用 `npm start` 开启启动命令