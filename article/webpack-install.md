### webpack 4.x 安装

1. 首先需要在全局中安装

```
npm install webpack -g
npm install webpack-cli -g  // 与webpack 3.x 的区别
```

2. 接下来打开新的文件夹，创建package.json

```
npm init
```

初始化 `package.json` 文件。

3. 局部安装

```
npm install webpack --save
npm install webpack-cli --save
```

### webpack 4.x 基本打包编译

1. webpack 3.x 编译

```
webpack a.js b.js
```

```bash
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

以上就是4版本之前的使用方式，但是这种方式在4版本中就不能使用了，4版本有自己的新的方式

2. webpack 4.x 默认打包编译

为什么上面要写默认打包编译，是因为webpack可以自定义打包编译配置，我们首先说下默认的打包编译。

```
entry: "/src/index.js"  // 默认入口文件
output: "/dist/main.js"  // 默认输入文件
```

上面路径及文件中，`src` 和 `index.js` 需要我们手动去创建，在 `index.js` 中写好js代码即可，其余的 `dist` 和 `main.js` 都是由系统自动生成的，并且当你再一次编译时，会自动的在 `dist` 中覆盖同名文件。


而webpack 4.x 的编译命令也发生变化了，如下所示，分为开发环境和生产环境的命令

```
webpack --mode development
webpack --mode production
```

使用命令后，会自动生成文件。

配置 `package.json` 文件

```js
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
}
```

可以使用 `npm ruin dev` 和 `npm run build` 进行执行命令