## 执行环境与作用域

执行环境（execution context ，为简单期间，有时被称为“环境”）是JavaScript中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但是解析器会在处理数据时访问它。

全局执行环境是最外围的一个执行环境。根据 ECMAScript 实现所在宿主环境不同，表示执行环境的对象也不一样。在web游览器中，全局执行环境默认为 `window` 对象，因此所有的全局变量和函数都作为 `window` 对象的属性和方法创建。某个执行环境的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局变量 可以认为一直存在，知道关闭网页或者关闭游览器时才会被销毁）

- 每个函数都有自己的执行环境

当执行流进入一个函数时，函数的环境就会被推入一个环境执行栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript程序中执行流正是由这个方便的机制控制着

当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数逇有序访问。作用域链的前端，始终都是执行当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 `arguments` 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象始终都是作用域中的最后一个对象。

标识符解析是沿着作用域一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。

```js
var color="blue";

function changeColor(){
	if(color==="blue"){
    	color = "red";
    }else{
    	color = "blue";
    }
}
changeColor();
console.log(color);  //red
```

这个简单的例子中，函数 `changeColor()` 的作用域包含两个对象：它自己的变量对象（其中定义着 `arguments` 对象）和全局环境的变量对象。可以在函数内部访问变量 `color` ，就是因为可以在这个作用域链中找到它。

此外，在局部作用域中定义的变量可以在局部环境中与全局变量互换使用，如下面所示：

```js
var color="blue";

function changeColor(){
	var anotherColor="red";
    // 这里可以访问全局变量color，以及自身定义的局部变量anotherColor
    function swapColors(){
        // 这里可以访问全局变量color，以及changeColor的局部变量anotherColor，以及自身定义的局部变量tempColor
    	var tempColor=anotherColor;
        anotherColor=color;
        color=tempColor;
    }
    swapColors();
}
// 这里只能访问全局变量color
changeColor();
```

以上代码有3个执行环境：全局环境、`changeColor()` 的局部环境和 `swapColors()` 的局部环境。全局环境中有一个变量 `color` 和一个函数 `changeColor()` 两个。 `changeColor()` 的局部环境中有一个名为 `anotherColor` 的变量和一个名为 `swapColor()` 的函数。`changeColor()` 是可以访问 `color` 变量。`swapColor()` 函数中有一个 `tempColor` 变量，它可以访问到全局变量 `color` 和 `changeColor()` 中的变量，但是 `changeColor()` 却不可用访问 `swapColor()` 中的变量。因为上面两个是  `swapColor()`  的父执行环境，可以访问，而子执行环境无法访问。

![执行环境](https://blog.spiritling.cn/images/screenshot_1532935559805.png)

上图实际的展示了执行环境的作用域链，每个执行环境可以调用父级执行环境，但是无法调用子执行环境。也就是说内部环境可以通过作用域链来访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。

### 延长作用域链

虽然上面我们看到执行环境只有两种——全局和局部（在es6中才会有块级作用域，在这里我们只讨论es5），但是天无绝人之路，我们可以使用其他办法来进行延长作用域链。

这么说是因为有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。在两种情况下会发生这种现象。具体来说，就是当执行流进入下列任何一个语句时，作用域链就会得到加长：

* `try-catch` 语句的 `catch` 模块
* `with` 语句

这连个语句都会在作用域链的前端添加一个变量对象。对 `with` 语句来说，会将制定的对象添加到作用域链中。对 `catch` 语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。

```js
function buildUrl(){
	var qs="?debug=true";
    
    with(location){
    	var url=href qs;
    }
    
    return url;
}
```
```js
//with的简单常规用法，用于理解
var obj=new Object();
obj.name="SpiritLing";
obj.age=22;

with(obj){
	console.log(name);  //SpiritLing
    console.log(age);  //22
}
```

这两个语句接受的是 `location` 对象，因此其变量对象就包含了 `location` 对象的所有属性和方法，而这个变量对象被添加到作用域链的前端。 `buildUrl()` 函数中定义了一个变量 `qs` 。当在 `with` 语句中引用变量 `href` 时（实际是引用 `location.href`），可以在当前执行环境的变量对象中找到。当引用变量 `qs` 时，引用的则是在 `buildUrl()` 中定义的那个变量，而该变量位于函数环境的变量对象中。至于 `with` 语句内部，则定义了一个名为 `url` 的变量，因而 `url` 就成了函数执行环境的一部分，所以可以作为函数的值被返回。

### 没有块级作用域（ES6中已出现）

在ES6之前的JavaScript中是没有块级作用域的，这会在理解上出现困惑。在其他语言中，由花括号封闭的代码块都有自己的作用域，因而支持根据条件来的定义变量。

```js
if(true){
	var color="red";
}
console.log(color);  //red
```

这是一个在 `if` 语句中定义变量 `color` 。如果是在其他语言中，`color` 会随着 `if` 语句执行完毕后被销毁。但在JavaScript中，`if` 语句中的变量声明会将变量添加到当前的执行环境（在这里就是全局变量）中。

- 所以我们在使用 `if-else` 、`switch-case`、`for` 等等时，需要注意这些其中使用的变量都会是它们当前所属的执行环境

```js
for(var i=0;i<10;i  ){
	doSomething(i);
}

console.log(i);  //10
```
对于有块级作用域的语言来说。`for` 语句初始化变量的表达式所定义的变量，只会存在于循环语句 `for` 的执行环境中，而不会在父执行环境出现。但是通过上面的代码块，我们发现在 `for ` 循环外面，我们输出了 `i` 。这说明，我们在循环语句的外围访问到了这个变量，意味着，这个变量是属于当前循环块所处的执行环境中，而不是循环块的执行环境。如何这个时候我们对变量不使用 `var` 时，则自动添加到全局变量中去，所以，我们在JavaScript中使用 `for`，`if` 等的时候，都需要注意这点。

#### 1. 声明变量

使用 `var` 声明的变量会自动被添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境；在 `with` 语句中，最接近的环境是函数环境。如果初始化变量时没有使用 `var` 声明，该变量会自动被添加到全局环境中。

```js
function add(num1,num2){
	var sum=num1 num2;
    return sum;
}

var result=add(10,20);  //30
console.log(sum);  //sum is not defined
```

以上代码中的函数 `add()` 定义了一个名为 `sum` 的局部变量，该变量存放加法操作的结果。虽然结果值从函数中返回了，但变量 `sum` 在函数外部无法访问到。如果省略 `var` 的声明，那么 `sum` 就变为全局环境了，就可以访问到。

```js
function add(num1,num2){
	sum = num1 num2;
    return sum;
}
var result = add(10,20);  //30
console.log(sum);  //30
```

上面的例子中说明了，没有使用 `var` 声明的变量，会自动添加到全局变量中去，所以，我们可以在函数外部访问到。

#### 2. 查询标识符

当在某个环境中为了读取或写入而引入一个标识符时，必须通过搜索确定标识符实际代表什么。搜索过程从作用域的前端开始，向上逐级查询与给定名字匹配的标识符。如果在局部环境中找到该标识符，则停止搜索，变量就绪。如果在局部环境中没有找到，则继续沿作用域链向上搜索。搜索过程直到全局环境的变量对象。如果在这里还是没有找到，则意味着该变量尚未声明。

- 例子1：

```js
var color="red"

function getColor(){
	return color;
}
console.log(getColor());  //"red";
```

- 例子2：

```js
var color="red"

function getColor(){
    var color="blue";
	return color;
}
console.log(getColor());  //"blue";
```

下面这张图可以说明情况：

![js](https://blog.spiritling.cn/images/screenshot_1533181340724.png)

> 当然查询变量也是需要耗费时间的，所以在使用中，尽量多使用局部变量，全局变量尽量少用，否则会污染全局环境，导致命名冲突。
 
### 变量提升

> 在说变量提升之前，我们需要先看会前面的执行环境和作用域。
 
接下来我们看下面这个例子：

```js
var color="blue";
function getColor(){
	console.log(color);
}
getColor();  //blue
```
上面的例子，想必所有人都可以不假思索的说出输出是 blue ，那么下面这个例子呢？

```js
var color="blue";
function getColor(){
	console.log(color);
    var color="red";
}
getColor();  //？？？
```

1. "blue"？？？
2. "red"？？？
3. "undefined"？？？

估计有上面三种的结果，都可以在编辑器或者F12打开控制台测试下，返现输出是 `undefined` ，当然也许有些游览器输出有点不同，那就是游览器的解析差异了，但是标准是输出 `undefined` ，这是为什么呢？

因为js中的变量是先声明在赋值的，所以变量声明在前，赋值在后，于是我们改写下上面的例子：

```js
var color;
color="blue";
function getColor(){
    var color;
	console.log(color); //undefined
    color="red";
}
getColor();  //undefined
```
最后正真的就是上面的这个例子，在 `getColor()` 函数中，当进行 `var` 定义时，变量定义会找到当前执行环境，进行声明，然后输出 `color` ，这时的 `color` 没有赋值，所以输出为 `undefined` ，在下面才进行了变量赋值。这就是变量提升的问题。


### 函数作用域提升

如果是函数和变量类型同时申明定义了，会发生什么事情呢？看下面的代码

```js
console.log(foo);
function foo(){};
var foo="FOO";
```

上面结果输出是 `ƒ foo(){}` ，也就是函数内容。这时为什么呢？？

**上面声明函数的方式叫做函数申明，因为函数申明的形式，在提升的时候，会被整个提升上去，包括函数定义的部分！**

如果是下面结果就不同了

```js
console.log(foo);
var foo=function(){};
var foo="FOO";
```

上面例子是使用变量形式进行声明函数，叫做函数表达式，和变量的声明一致，先声明在赋值，所以显示为 `undefined`，上面两个例子就是函数作用域提升。