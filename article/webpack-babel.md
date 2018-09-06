## webpack babel

### 安装

核心
	babel-core
    
功能
	babel-loader
	babel-preset-env
    babel-preset-react
    
#### babel-loader 7.x 版本安装

```shell
cnpm install babel-core babel-loader@7 babel-preset-env babel-preset-react --save
```

安装的 `babel-loader` 是7.x版本，8.x版本目前会出现报错，具体如何解决还没有了解清楚，所以安装 `babel-loader` 时需要写成这样的 `babel-loader@7`

#### babel-loader 8.x 版本安装

```shell
cnpm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react -S
```
上面为 `babel-loader 8.x`  版本安装，需要匹配下面的 8.x 配置

### 配置

#### babel-loader 7.x 版本配置

第一种 全在 `webpack.config.js` 中配置

```js
rules:[
    {
        test:/\.(jsx|js)$/,
        use:{
            loader:'babel-loader',
            options:{
                presets:['env','react']
            }
        },
        // 排除node_,modules 文件
        exclude:/node_modules/
    }
]
```

第二种 新建 `.babelrc` 文件 （推荐使用第二种）

webpack.config.js

```js
rules:[
    {
        test:/\.(jsx|js)$/,
        use:{
            loader:'babel-loader'
        },
        // 排除node_,modules 文件
        exclude:/node_modules/
    }
]
```
.baelrc

```
{
    "presets": [
        "env",
        "react"
    ]
}
```

#### babel-loader 8.x 版本配置

第一种 全在 `webpack.config.js` 中配置

```js
rules:[
    {
        test:/\.(jsx|js)$/,
        use:{
            loader:'babel-loader',
            options:{
                presets:['"@babel/preset-env','"@babel/preset-react']
            }
        },
        // 排除node_,modules 文件
        exclude:/node_modules/
    }
]
```

第二种 新建 `.babelrc` 文件 （推荐使用第二种）

webpack.config.js

```js
rules:[
    {
        test:/\.(jsx|js)$/,
        use:{
            loader:'babel-loader'
        },
        // 排除node_,modules 文件
        exclude:/node_modules/
    }
]
```
.baelrc

```
{
    "presets": [
        ""@babel/preset-env",
        ""@babel/preset-react"
    ]
}
```