## webpack loader处理

loader ： 加载程序

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

### 安装

```shell
cnpm install css-loader style-loader -S
```

### 配置

当新建文件 `*.css` 文件时进行css文件处理

webpack.config.js

```js
module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        }
    ]
}
```
在其中需要注意的就是 `style-loader` 在 `css-loader` 之前。

当 css 有 `background-image: url('./1.jpg')` 有图片插入进来时，需要使用 `file-loader` 来进行处理

```js
module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        {
            test:/\.(jpg|png|jpeg)$/,
            use:['file-loader']
        }
    ]
}
```
设置图片保存地方及是否使用base64进行处理

```js
{
    test:/\.(jpg|png|jpeg)$/,
    use:'file-loader?limit=1024&name=./images/[hash:8].[name].[ext]'
}
```


### HTML的img标记处理

#### 安装

```shell
cnpm install html-withimg-loader -S
```


#### 配置

```shell
{
    test:/\.html$/,
    use:["html-withimg-loader"]
}
```

### CSS 打包分离

#### 安装

```shell
cnpm install extract-text-webpack-plugin@next -S
```

#### 配置


```js
const ExtractTextPlugin=require('extract-text-webpack-plugin');

//插件
new ExtractTextPlugin('./css/[name].css')

// rules
{
    test:/\.css$/,
    use:ExtractTextPlugin.extract({
        fallback:"style-loader",
        use:[{
            loader:"css-loader",
            options:{
                // 压缩
                minimize:true
            }
        }],
        // 添加公共路径
        publicPath:"../"
    })
}
```

